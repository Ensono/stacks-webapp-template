import next from 'next';
import express from 'express';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(
  () => {
    const server = express();

    server.get('/', (req, res) => app.render(req, res, '/', req.query));

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  },
  (e) => {
    // eslint-disable-next-line no-console
    console.log('server initialization failed:', e);
  },
);
