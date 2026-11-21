import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.3:4',
  releaseNotes: {
    en_US:
      'Updates the pinned Minecraft server image to include the upstream Java4Shell fix. Keeps the existing protection for previously cached modded Java runtimes. Details: https://adoptium.net/news/2026/11/temurin-november-2026-cspu-java4shell',
    es_ES:
      'Actualiza la imagen fijada del servidor de Minecraft para incluir la corrección de Java4Shell de upstream. Conserva la protección existente para los entornos Java modificados almacenados previamente en caché. Detalles: https://adoptium.net/news/2026/11/temurin-november-2026-cspu-java4shell',
    de_DE:
      'Aktualisiert das angeheftete Minecraft-Server-Image mit dem Upstream-Fix für Java4Shell. Der bestehende Schutz für zuvor zwischengespeicherte modifizierte Java-Laufzeiten bleibt erhalten. Details: https://adoptium.net/news/2026/11/temurin-november-2026-cspu-java4shell',
    pl_PL:
      'Aktualizuje przypięty obraz serwera Minecraft, aby zawierał poprawkę Java4Shell od upstreamu. Zachowuje istniejącą ochronę wcześniej zapisanych w pamięci podręcznej zmodyfikowanych środowisk Java. Szczegóły: https://adoptium.net/news/2026/11/temurin-november-2026-cspu-java4shell',
    fr_FR:
      'Met à jour l’image épinglée du serveur Minecraft pour inclure le correctif Java4Shell en amont. Conserve la protection existante pour les environnements Java moddés précédemment mis en cache. Détails : https://adoptium.net/news/2026/11/temurin-november-2026-cspu-java4shell',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
