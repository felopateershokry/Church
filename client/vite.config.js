import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get repo name from environment or use empty string for root domain
// For GitHub Pages: https://username.github.io/repo-name/
// If deployed to root: https://username.github.io/ then use ''
const base = process.env.GITHUB_REPO_NAME ? `/${process.env.GITHUB_REPO_NAME}/` : '/';

// https://vite.dev/config/
export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Suppress connection errors when backend is not running
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            // Silently handle proxy errors (backend not running)
            // The frontend will handle API failures gracefully
          });
        },
      }
    }
  }
})
