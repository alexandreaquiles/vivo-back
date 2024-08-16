import request from 'supertest';
import { expect } from 'chai';
import { runApp } from '../app.js';

const app = runApp();

describe('Basic API', function () {
  it('should GET / and greet', async function () {

    const response = await request(app).get('/');

    expect(response.status).to.equal(200);

    expect(response.text).to.equal('Estou na Vivo!');
  });
});