import request from 'supertest';
import { expect } from 'chai';
import { MongoDBContainer } from '@testcontainers/mongodb';
import { MongoClient } from 'mongodb';

import { runApp } from '../app.js';

describe('Why Us CRUD Testcontainers', () => {
  let mongoDbContainer;
  let client;
  let app;
  let vivoDb;

  before(async function () {
    this.timeout(30000);
    mongoDbContainer = await new MongoDBContainer("mongo:6.0.1").start();
    const uri = mongoDbContainer.getConnectionString();
    client = new MongoClient(uri, { directConnection: true});
    vivoDb = client.db(`vivoDb${Date.now()}`);
    await vivoDb.collection('motivos').createIndex( { title: 'text'} )
    app = runApp(vivoDb);
  });

  after(async function () {
    await client.close();
    await mongoDbContainer.stop();
  });

  it('should return reasons when GET /api/porque-a-vivo from a container DB', async () => {
    await vivoDb.collection('motivos').insertMany([{ title: 'Motivo 1' }, { title: 'Motivo 2' }]);

    const response = await request(app).get('/api/porque-a-vivo');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').with.lengthOf(2);
    expect(response.body[0].title).to.equal('Motivo 1');
    expect(response.body[1].title).to.equal('Motivo 2');
  });

  it('should return 404 when no reasons are found', async () => {

    const response = await request(app).get('/api/porque-a-vivo/nonexistent');

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Não encontrado: nonexistent');
  });

});