import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to run Vercel serverless function locally in Vite dev server
const apiFallbackPlugin = () => ({
  name: 'api-fallback',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res, next) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            req.body = JSON.parse(body);
            // Mock Express res object that Vercel uses
            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };
            const handler = (await import('./api/chat.js')).default;
            await handler(req, res);
          } catch (err) {
            console.error('Local API Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiFallbackPlugin()],
})
