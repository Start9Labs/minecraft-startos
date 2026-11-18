import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.3:3',
  releaseNotes: {
    en_US:
      'Security update to mitigate CVE-2026-114938 (Java4Shell). Details: https://calif.io/java4shell/',
    es_ES:
      'Actualización de seguridad para mitigar CVE-2026-114938 (Java4Shell). Detalles: https://calif.io/java4shell/',
    de_DE:
      'Sicherheitsupdate zur Entschärfung von CVE-2026-114938 (Java4Shell). Details: https://calif.io/java4shell/',
    pl_PL:
      'Aktualizacja zabezpieczeń ograniczająca ryzyko CVE-2026-114938 (Java4Shell). Szczegóły: https://calif.io/java4shell/',
    fr_FR:
      'Mise à jour de sécurité pour atténuer CVE-2026-114938 (Java4Shell). Détails : https://calif.io/java4shell/',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
