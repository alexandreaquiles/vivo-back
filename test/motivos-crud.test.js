import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';

import { runApp } from '../app.js';

describe('Why Us CRUD', () => {
  let stubMotivosCollection;
  let stubDb;
  let app;

  before(() => {
    stubDb = { collection: sinon.stub() };
    stubMotivosCollection = { find: sinon.stub() };
    stubDb.collection.withArgs('motivos').returns(stubMotivosCollection);
    app = runApp(stubDb);
  });

  after(() => {
    sinon.restore();
  });

  it('should return reasons when GET /api/porque-a-vivo', async () => {
    const mockMotivos = [{ title: 'Motivo 1' }, { title: 'Motivo 2' }];
    stubMotivosCollection.find.returns({
      toArray: sinon.stub().resolves(mockMotivos)
    });

    const response = await request(app).get('/api/porque-a-vivo');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').with.lengthOf(2);
    expect(response.body[0].title).to.equal('Motivo 1');
    expect(response.body[1].title).to.equal('Motivo 2');
  });

  it('should return 404 when no reasons are found', async () => {
    stubMotivosCollection.find.returns({
      toArray: sinon.stub().resolves([])
    });

    const response = await request(app).get('/api/porque-a-vivo/nonexistent');

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Não encontrado: nonexistent');
  });

});