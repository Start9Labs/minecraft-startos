const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const {
  mkdtemp,
  chmod,
  chown,
  readFile,
  mkdir,
  stat,
  rm,
  writeFile,
} = require('node:fs/promises')
const { readFileSync } = require('node:fs')
const { tmpdir } = require('node:os')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const ts = require('typescript')
const { z } = require('@start9labs/start-sdk')
const { blake3 } = require(
  require.resolve('@noble/hashes/blake3', {
    paths: [path.dirname(require.resolve('@start9labs/start-sdk'))],
  }),
)

function load(file, modules) {
  const exports = {}
  const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
  const options = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    process.cwd(),
  ).options
  runInNewContext(
    ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { ...options, module: ts.ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      Buffer,
      URL,
      require: (name) => (name in modules ? modules[name] : require(name)),
    },
  )
  return exports
}

function production(root, prepareUpload = async () => 'upload-id') {
  const identity = (value) => value
  const sdk = {
    volumes: { main: { subpath: (name) => path.join(root, name) } },
    InputSpec: { of: identity },
    Variants: { of: identity },
    Value: Object.fromEntries(
      ['union', 'text', 'textarea', 'toggle', 'list', 'file'].map((name) => [
        name,
        identity,
      ]),
    ),
    List: { obj: identity },
    Action: { withInput: (_id, _metadata, input) => ({ input }) },
    prepareUpload,
  }
  const model = load('startos/fileModels/store.json.ts', {
    '@start9labs/start-sdk': { z, FileHelper: { json: () => ({}) } },
    '../sdk': { sdk },
  })
  const modpacks = load('startos/modpacks.ts', {
    '@start9labs/start-sdk': { z },
    './fileModels/store.json': model,
    './i18n': { i18n: identity },
    './sdk': { sdk },
  })
  const { modLoader } = load('startos/actions/setup/modLoader.ts', {
    '../../fileModels/store.json': model,
    '../../i18n': { i18n: identity },
    '../../modpacks': modpacks,
    '../../sdk': { sdk },
  })
  return { ...modpacks, model, input: modLoader.input }
}

async function zip(filename, name) {
  const result = spawnSync(
    'python3',
    [
      '-c',
      'import json,sys,zipfile; z=zipfile.ZipFile(sys.argv[1],"w"); z.writestr("modrinth.index.json",json.dumps({"formatVersion":1,"game":"minecraft","versionId":"fixture","name":sys.argv[2],"files":[],"dependencies":{"minecraft":"1.21.8","fabric-loader":"0.19.5"}})); z.close()',
      filename,
      name,
    ],
    { encoding: 'utf8' },
  )
  assert.equal(result.status, 0, result.stderr)
}

test('each form stages a distinct bounded upload away from the active pack', async () => {
  const prepared = []
  const api = production('/volume', async (_effects, options) => {
    prepared.push(options)
    return `upload-${prepared.length}`
  })
  for (let i = 0; i < 2; i++) {
    const form = await api.input({ effects: {} })
    assert.equal(
      form.loader.variants.modpack.spec.source.variants.upload.spec.file
        .uploadId,
      `upload-${i + 1}`,
    )
  }
  assert.notEqual(prepared[0].path, prepared[1].path)
  for (const options of prepared) {
    assert.equal(options.volume, 'main')
    assert.equal(options.maxSize, 512 * 1024 * 1024)
    assert.notEqual(options.path, api.model.uploadedModpackSubpath)
  }
})

for (const outcome of ['valid', 'invalid', 'persist-failure']) {
  test(`volume-relative upload ${outcome} preserves promotion and cleanup guarantees`, async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'minecraft-upload-'))
    try {
      if (process.getuid() === 0) await chown(root, 1000, 1000)
      const api = production(root)
      const destination = path.join(root, api.model.uploadedModpackSubpath)
      await mkdir(path.dirname(destination), { recursive: true })
      await zip(destination, 'old pack')
      const original = await readFile(destination)
      const stage = path.join(root, '.incoming.mrpack')
      if (outcome === 'invalid') await writeFile(stage, 'not a zip')
      else await zip(stage, 'new pack')
      await chmod(stage, 0o600)
      const incoming = await readFile(stage)
      const file = {
        name: 'pack.mrpack',
        path: '.incoming.mrpack',
        mime: 'application/zip',
        commitment: {
          hash: Buffer.from(blake3(incoming)).toString('base64'),
          size: incoming.length,
        },
      }
      let persisted = false
      const operation = api.replaceUploadedModpack(file, async (hash) => {
        assert.match(hash, /^[a-f0-9]{64}$/)
        if (outcome === 'persist-failure') throw new Error('persist failed')
        persisted = true
      })
      if (outcome === 'valid') {
        await operation
        assert(persisted)
        assert.deepEqual(await readFile(destination), incoming)
        const promoted = await stat(destination)
        const owner = await stat(root)
        assert.equal(promoted.uid, owner.uid)
        assert.equal(promoted.gid, owner.gid)
        assert.equal(promoted.mode & 0o777, 0o600)
      } else {
        await assert.rejects(
          operation,
          outcome === 'invalid' ? /not a valid Modrinth/ : /persist failed/,
        )
        assert(!persisted)
        assert.deepEqual(await readFile(destination), original)
      }
      await assert.rejects(stat(stage), { code: 'ENOENT' })
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })
}
