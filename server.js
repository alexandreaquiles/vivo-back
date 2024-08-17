import { MongoClient } from 'mongodb';
import { runApp } from './app.js';

const uri = "mongodb://admin:secret@127.0.0.1:27017/?authSource=admin";
const client = new MongoClient(uri);
const vivoDb = client.db('vivoDb');

const port = 3000;

const app = runApp(vivoDb);

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
