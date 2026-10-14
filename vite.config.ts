import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'static-portfolio-preview',
      configureServer(server) {
        server.middlewares.use(
          '/portfolio.html',
          async (_request, response, next) => {
            try {
              const { renderDocument } = await server.ssrLoadModule(
                '/src/app/static-entry.tsx',
              );
              response.setHeader('Content-Type', 'text/html');
              response.end(renderDocument());
            } catch (error) {
              next(error);
            }
          },
        );
      },
    },
  ],
  base: process.env.VITE_BASE_PATH || '/',
  optimizeDeps: { entries: ['index.html'] },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
    watch: {
      ignored: [
        '**/playwright-report/**',
        '**/test-results/**',
        '**/artifacts/**',
      ],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
