import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    middleware: [
      (req, res, next) => {
        const allowedIps = ['45.64.199.162', '182.48.233.226'];
        const clientIp = req.ip || req.headers['x-forwarded-for'];

        if (!allowedIps.includes(clientIp)) {
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        next();
      },
    ],
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
