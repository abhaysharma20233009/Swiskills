import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Import the React plugin

export default defineConfig({
  plugins: [react()],  // Add the React plugin
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://swiskills.onrender.com',  // API server
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'https://swiskills.onrender.com',  // WebSocket server
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
  },
  base: './', // 🟢 VERY IMPORTANT for correct asset paths in production
});
