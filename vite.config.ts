import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    visualizer({
      open: true, // 빌드 후 브라우저에서 시각화 결과를 자동으로 엽니다.
    }),
  ],
  build: {
    rollupOptions: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      plugins: [terser()],
    },
  },
});
