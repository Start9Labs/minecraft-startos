import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.3:3',
  releaseNotes: {
    en_US: `Requires StartOS 0.4.2 or later. Security: disable JVM Base64 intrinsics by default for bundled Java and selected cached JREs to mitigate CVE-2026-114938 (Java4Shell) on affected AVX-512 x86 processors. ARM is not affected by this CVE. No service-specific exploit has been established. Custom launcher/modpack JVM flags can override this default; existing configuration is preserved. Java 8 remains supported.

Now maintained by Start9 and published in the Start9 Registry.`,
    es_ES: `Requiere StartOS 0.4.2 o posterior. Seguridad: se desactivan por defecto los intrínsecos Base64 de la JVM para Java incluido y los JRE seleccionados en caché, para mitigar CVE-2026-114938 (Java4Shell) en procesadores x86 con AVX-512 afectados. ARM no está afectado por este CVE. No se ha demostrado un exploit específico del servicio. Los argumentos JVM personalizados del lanzador o modpack pueden anular este valor; se conserva la configuración existente. Se mantiene la compatibilidad con Java 8.

Ahora lo mantiene Start9 y se publica en el Start9 Registry.`,
    de_DE: `Erfordert StartOS 0.4.2 oder neuer. Sicherheit: JVM-Base64-Intrinsics für das mitgelieferte Java und ausgewählte zwischengespeicherte JREs standardmäßig deaktiviert, um CVE-2026-114938 (Java4Shell) auf betroffenen x86-Prozessoren mit AVX-512 zu entschärfen. ARM ist von diesem CVE nicht betroffen. Ein dienstspezifischer Exploit wurde nicht nachgewiesen. Eigene JVM-Optionen von Launcher oder Modpack können diesen Standard überschreiben; bestehende Konfiguration bleibt erhalten. Java 8 wird weiterhin unterstützt.

Wird jetzt von Start9 gepflegt und in der Start9 Registry veröffentlicht.`,
    pl_PL: `Wymaga StartOS 0.4.2 lub nowszego. Bezpieczeństwo: domyślnie wyłączono intrinsics Base64 JVM dla dołączonej Javy i wybranych JRE w pamięci podręcznej, aby ograniczyć CVE-2026-114938 (Java4Shell) na podatnych procesorach x86 z AVX-512. ARM nie jest objęty tym CVE. Nie wykazano exploita specyficznego dla tej usługi. Własne opcje JVM launchera lub modpacka mogą nadpisać to ustawienie; istniejąca konfiguracja pozostaje zachowana. Java 8 nadal jest obsługiwana.

Teraz utrzymywany przez Start9 i publikowany w Start9 Registry.`,
    fr_FR: `Nécessite StartOS 0.4.2 ou une version ultérieure. Sécurité : désactivation par défaut des intrinsèques Base64 de la JVM pour Java intégré et les JRE sélectionnés en cache, afin d’atténuer CVE-2026-114938 (Java4Shell) sur les processeurs x86 AVX-512 concernés. ARM n’est pas affecté par ce CVE. Aucun exploit propre au service n’a été établi. Les options JVM personnalisées du lanceur ou du modpack peuvent remplacer cette valeur ; la configuration existante est préservée. Java 8 reste pris en charge.

Désormais maintenu par Start9 et publié dans le Start9 Registry.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
