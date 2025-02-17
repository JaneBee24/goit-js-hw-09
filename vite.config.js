import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  root: 'src',  
  base: '/goit-js-hw-09/', 
  build: {
    outDir: '../dist', 
    emptyOutDir: true, 
  },
  plugins: [injectHTML()],
});
