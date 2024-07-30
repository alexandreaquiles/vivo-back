import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Estou na Vivo!');
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
