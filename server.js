import { MongoClient } from 'mongodb';
import { runApp } from './app.js';
import 'dotenv/config';

const mongoUri = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

const client = new MongoClient(mongoUri);
const vivoDb = client.db('vivoDb');

const app = runApp(vivoDb);

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
