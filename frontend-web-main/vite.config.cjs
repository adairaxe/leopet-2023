import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Agregar estas configuraciones de rutas que apuntan a: /node_modules/paganini
      { find: '@', replacement: '/node_modules/paganini/src' },
      {
        find: '@components',
        replacement: '/node_modules/paganini/src/components',
      },
      { find: '@helpers', replacement: '/node_modules/paganini/src/helpers' },
      { find: '@hooks', replacement: '/node_modules/paganini/src/hooks' },
      { find: '@services', replacement: '/node_modules/paganini/src/services' },
      { find: '@modules', replacement: '/node_modules/paganini/src/modules' },
      { find: '@pages', replacement: '/node_modules/paganini/src/pages' },
    ],
  },
});
