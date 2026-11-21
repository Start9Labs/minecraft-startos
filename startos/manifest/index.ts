import { setupManifest } from '@start9labs/start-sdk'
import { longDescription, shortDescription } from './i18n'

export const manifest = setupManifest({
  id: 'minecraft',
  title: 'Minecraft Server',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/Start9Labs/minecraft-startos',
  upstreamRepo: 'https://github.com/itzg/docker-minecraft-server',
  marketingUrl: 'https://www.minecraft.net/',
  donationUrl: null,
  description: {
    short: shortDescription,
    long: longDescription,
  },
  volumes: ['main'],
  images: {
    'minecraft-server': {
      source: {
        dockerBuild: {
          buildArgs: {
            IMAGE:
              'itzg/minecraft-server:java25@sha256:936047f90da9eda3964e224f0decde4d65f3fa360ce317f03ce66576ad83494b',
          },
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
    rcon: {
      source: { dockerBuild: { dockerfile: './rcon.Dockerfile' } },
      arch: ['x86_64', 'aarch64'],
    },
    'rcon-proxy': {
      source: { dockerTag: 'nginx:1.30-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
