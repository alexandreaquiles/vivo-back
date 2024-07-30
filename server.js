import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Estou na Vivo!');
});

app.get('/api/porque-a-vivo/:titulo', async (req, res) => {
  const data = await fs.readFile('por-que-a-vivo.json', 'utf8');
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

});

app.get('/api/planos', async (req, res) => {
  const data = await fs.readFile('planos.json', 'utf-8');
  const planos = JSON.parse(data);
  res.json(planos);
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
