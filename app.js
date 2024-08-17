import express from 'express';
import cors from 'cors';
import { ObjectId } from 'mongodb';

import { logging } from './middlewares/logging.js'
import { errorHandling } from './middlewares/errors.js';
import { authenticateToken } from './middlewares/auth.js';
import { authRoutes } from './routes/auth-routes.js';

function runApp(vivoDb) {

  const app = express();

  app.use(logging);
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Estou na Vivo!');
  });

  app.get('/api/porque-a-vivo/:titulo?', async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    try {

      const filtro = req.params.titulo;

      let filtroBd = {};
      if (filtro) {
        filtroBd = { $text: { $search: filtro } };
      }

      let motivos = await motivosColl.find(filtroBd, { sort: { title: 1 } }).toArray();

      if (motivos.length) {
        res.json(motivos);
      } else {
        res.status(404).send(`Não encontrado: ${filtro}`);
      }

    } catch (error) {
      next(error);
    }

  });

  app.post('/api/porque-a-vivo', authenticateToken, async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    const novoMotivo = req.body;

    if (!novoMotivo || !novoMotivo.title || !novoMotivo.description) {
      console.log(novoMotivo);
      res.sendStatus(400);
    } else {
      await motivosColl.insertOne(novoMotivo);
      res.sendStatus(201);
    }

  });

  app.put('/api/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    try {

      const id = req.params.id;
      const motivo = req.body;

      if (!motivo || !motivo.title || !motivo.description) {
        console.log(motivo);
        res.sendStatus(400);
      } else {
        await motivosColl.replaceOne({ _id: new ObjectId(id) }, motivo);
        res.sendStatus(200);
      }

    } catch (error) {
      next(error);
    }

  });

  app.patch('/api/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    try {
      const id = req.params.id;
      const novoTitulo = req.body.title;

      if (!novoTitulo) {
        res.sendStatus(400);
      } else {
        await motivosColl.updateOne({ _id: new ObjectId(id) },
          { $set: { title: novoTitulo } });
        res.sendStatus(200);
      }
    } catch (error) {
      next(error);
    }
  });

  app.delete('/api/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    try {

      const id = req.params.id;

      await motivosColl.deleteOne({ _id: new ObjectId(id) });
      res.sendStatus(200);

    } catch (error) {
      next(error);
    }

  });

  app.use('/api', authRoutes());

  app.use(errorHandling);

  return app;
}

export { runApp };