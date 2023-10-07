import http from 'http';
import { HttpStatuses } from './utils/httpStatuses.js';
import { routes } from './routes.js';
import { erorrHandler } from './errors.js';

const PORT = 3000;

const runRouter = (req, res) => {
  try {
    const currentRoute = routes.find((r) => r.matcher(req, res));
    res.setHeader('Content-Type', 'text/json');

    if (!currentRoute) {
      res.setStatus = HttpStatuses.NOT_FOUND;
      res.end(JSON.stringify({ error: 'Not Found' }));
      return;
    }

    currentRoute.routeProccessor(req, res);
  }
  catch (e) {
    erorrHandler(e, res);
  }
};

const server = http.createServer(runRouter);
server.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}`));
