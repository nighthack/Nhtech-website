import * as fs from 'node:fs/promises';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { submitContact } from './src/server/contact';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middlewares
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API Route: Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const result = await submitContact(req.body, clientIp);
    return res.status(result.statusCode).json(result.body);
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { redirect: false }));
    app.get('*', async (req: Request, res: Response) => {
      const route = req.path.replace(/\/+$/, '') || '/';
      const aliases: Record<string, string> = { '/forward-deployed-engineering': '/fde', '/sovereign-models': '/on-prem-ai', '/sovereign-ai': '/on-prem-ai' };
      if (aliases[route]) return res.redirect(301, aliases[route]);
      if (req.path !== route && route !== '/') return res.redirect(301, route);
      const candidate = path.resolve(distPath, `.${route}`, 'index.html');
      if (!candidate.startsWith(distPath + path.sep)) return res.status(404).sendFile(path.join(distPath, '404.html'));
      try { await fs.access(candidate); return res.sendFile(candidate); }
      catch { return res.status(404).sendFile(path.join(distPath, '404.html')); }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NHTech Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
