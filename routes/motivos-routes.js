import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { authenticateToken } from '../middlewares/auth.js';

function motivoRoutes(vivoDb) {

  const router = Router();

  router.get('/porque-a-vivo/:titulo?', async (req, res, next) => {
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

  router.post('/porque-a-vivo', authenticateToken, async (req, res, next) => {
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

  router.put('/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
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

  router.patch('/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
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

  router.delete('/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
    const motivosColl = vivoDb.collection('motivos');

    try {

      const id = req.params.id;

      await motivosColl.deleteOne({ _id: new ObjectId(id) });
      res.sendStatus(200);

    } catch (error) {
      next(error);
    }

  });

  return router;
}

export { motivoRoutes };