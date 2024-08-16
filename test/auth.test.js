import request from 'supertest';
import { expect } from 'chai';

import { runApp } from '../app.js';

const app = runApp();

describe('API Authentication', function () {
  it('should return a token when POST /api/login with valid credentials', async function() {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: '123' });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should fail when POST /api/login with wrong credentials', async function() {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'errado' });
    expect(response.status).to.equal(401);
  });
});