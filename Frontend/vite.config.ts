import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode: _mode }) => {
  // Proxy target is always local backend in dev
  // VITE_API_URL is only used for production builds
  const proxyTarget = 'http://localhost:5000'

  return {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      react(),
    ],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err) => console.error('Proxy error:', err))
          },
        },
      },
    },
  }
})
