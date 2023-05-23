import legacy from '@vitejs/plugin-legacy';
import ip from 'ip';
import { defineConfig, ServerOptions } from 'vite';

export default ({ mode }) => {
  const isDevelopment = mode === 'development';
  const serverOptions: ServerOptions = {
    open: true,
    port: 8000,
    https: false,
    host: ip.address(),
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  };

  return defineConfig({
    plugins: [
      !isDevelopment &&
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
    ],
    mode,
    build: {
      outDir: 'www',
      minify: !isDevelopment,
    },
    css: {
      modules: {
        localsConvention: 'dashesOnly',
      },
    },

    server: isDevelopment ? serverOptions : {},
    define: {
      APP_CONFIG: {
        baseApiUrl: 'http://localhost:3000',
      },
    },
  });
};
