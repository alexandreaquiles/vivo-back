import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Estou na Vivo!');
});

app.get('/api/porque-a-vivo/:titulo?', async (req, res, next) => {

  try {
    const data = await fs.readFile('diretorio/por-que-a-vivo.json', 'utf8');
    let motivos = JSON.parse(data);
  
    const filtro = req.params.titulo;
    if (filtro) {
      motivos = motivos.filter(m => m.title.includes(filtro));
    }
  
    if (motivos.length) {
      res.json(motivos);
    } else {
      res.status(404).send(`Não encontrado: ${filtro}`);
    }
  
  } catch(error) {
    next(error);
  }

});

app.post('/api/porque-a-vivo', async (req, res, next) => {
  const data = await fs.readFile('por-que-a-vivo.json', 'utf8');
  const motivos = JSON.parse(data);

  const novoMotivo = req.body;

  if (!novoMotivo || !novoMotivo.title || !novoMotivo.description) {
    console.log(novoMotivo);
    res.sendStatus(400);
  } else {
    motivos.push(novoMotivo);

    const dataParaGravar = JSON.stringify(motivos);
    await fs.writeFile('por-que-a-vivo.json', dataParaGravar, 'utf8');
    res.sendStatus(201);
  }

});

app.get('/api/planos', async (req, res) => {
  const data = await fs.readFile('planos.json', 'utf-8');
  const planos = JSON.parse(data);
  res.json(planos);
});

app.post('/api/planos', async (req, res) => {
  const data = await fs.readFile('planos.json', 'utf8');
  const planos = JSON.parse(data);

  const novoPlano = req.body;

  if (!novoPlano || !novoPlano.title || !novoPlano.price || !novoPlano.details || !novoPlano.offer) {
    console.log(novoPlano);
    res.sendStatus(400);
  } else {
    planos.push(novoPlano);

    const dataParaGravar = JSON.stringify(planos);
    await fs.writeFile('planos.json', dataParaGravar, 'utf8');
    res.sendStatus(201);
  }

});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro inesperado :/');
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
