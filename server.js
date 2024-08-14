import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'meu_segredo';

const uri = "mongodb://admin:secret@127.0.0.1:27017/?authSource=admin";
const client = new MongoClient(uri);
const vivoDb = client.db('vivoDb');
const motivosColl = vivoDb.collection('motivos');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Estou na Vivo!');
});

app.get('/api/porque-a-vivo/:titulo?', async (req, res, next) => {

  try {
  
    const filtro = req.params.titulo;

    let filtroBd = {};
    if (filtro) {
      filtroBd = { $text: { $search: filtro } };
    }

    let motivos = await motivosColl.find( filtroBd, { sort: { title: 1 } } ).toArray();
  
    if (motivos.length) {
      res.json(motivos);
    } else {
      res.status(404).send(`Não encontrado: ${filtro}`);
    }
  
  } catch(error) {
    next(error);
  }

});

app.post('/api/porque-a-vivo', authenticateToken, async (req, res, next) => {

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

  try {

    const id = req.params.id;
    const motivo = req.body;

    if (!motivo || !motivo.title || !motivo.description) {
      console.log(motivo);
      res.sendStatus(400);
    } else {
      await motivosColl.replaceOne({ _id: new ObjectId(id)}, motivo );
      res.sendStatus(200);
    }

  } catch(error) {
    next(error);
  }

});

app.patch('/api/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const novoTitulo = req.body.title;

    if (!novoTitulo) {
      res.sendStatus(400);
    } else {
      await motivosColl.updateOne({ _id: new ObjectId(id)},
                                  { $set: { title: novoTitulo }} );
      res.sendStatus(200);
    }
  } catch(error) {
    next(error);
  }
});

app.delete('/api/porque-a-vivo/:id', authenticateToken, async (req, res, next) => {

  try {

    const id = req.params.id;

    await motivosColl.deleteOne({ _id: new ObjectId(id)});
    res.sendStatus(200);

  } catch(error) {
    next(error);
  }

});

app.post('/api/login', (req, res) => {
  // Aqui você normalmente verificaria as credenciais no banco de dados
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '123') {
    const token = jwt.sign(
      { username, role: 'admin' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Autenticação falhou' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro inesperado :/');
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
