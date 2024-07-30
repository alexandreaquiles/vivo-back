import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Estou na Vivo!');
});

app.get('/api/porque-a-vivo', async (req, res) => {
  const data = await fs.readFile('por-que-a-vivo.json', 'utf8');
  res.json(data);
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
