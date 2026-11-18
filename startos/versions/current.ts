import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.3:3',
  releaseNotes: {
    en_US:
      'Security updates to mitigate CVE-2026-114938 (Java4Shell) and apply the November Node.js fixes. Details: https://calif.io/java4shell/ and https://nodejs.org/en/blog/vulnerability/november-2026-security-releases',
    es_ES:
      'Actualizaciones de seguridad para mitigar CVE-2026-114938 (Java4Shell) y aplicar las correcciones de noviembre de Node.js. Detalles: https://calif.io/java4shell/ y https://nodejs.org/en/blog/vulnerability/november-2026-security-releases',
    de_DE:
      'Sicherheitsupdates zur Entschärfung von CVE-2026-114938 (Java4Shell) und mit den November-Korrekturen für Node.js. Details: https://calif.io/java4shell/ und https://nodejs.org/en/blog/vulnerability/november-2026-security-releases',
    pl_PL:
      'Aktualizacje zabezpieczeń ograniczające ryzyko CVE-2026-114938 (Java4Shell) i zawierające listopadowe poprawki Node.js. Szczegóły: https://calif.io/java4shell/ oraz https://nodejs.org/en/blog/vulnerability/november-2026-security-releases',
    fr_FR:
      'Mises à jour de sécurité pour atténuer CVE-2026-114938 (Java4Shell) et appliquer les correctifs de novembre de Node.js. Détails : https://calif.io/java4shell/ et https://nodejs.org/en/blog/vulnerability/november-2026-security-releases',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
