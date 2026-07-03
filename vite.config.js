import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/cards-control/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'Figurinhas Copa 2026',
        short_name: 'Copa 2026',
        description: 'Controle suas figurinhas Panini da Copa do Mundo FIFA 2026',
        display: 'fullscreen',
        orientation: 'portrait-primary',
        start_url: '/cards-control/',
        scope: '/cards-control/',
        theme_color: '#1a1a2e',
        background_color: '#ffffff',
        lang: 'pt-BR',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [],
      },
    }),
  ],
});
