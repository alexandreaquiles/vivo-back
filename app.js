import express from 'express';
import cors from 'cors';

import { logging } from './middlewares/logging.js'
import { errorHandling } from './middlewares/errors.js';
import { authRoutes } from './routes/auth-routes.js';
import { motivoRoutes } from './routes/motivos-routes.js';

function runApp(vivoDb) {

  const app = express();

  app.use(logging);
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Estou na Vivo!');
  });

  app.use('/api', authRoutes());
  app.use('/api', motivoRoutes(vivoDb));

  app.use(errorHandling);

  return app;
}

export { runApp };