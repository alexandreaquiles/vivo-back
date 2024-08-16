import request from 'supertest';
import { expect } from 'chai';

import { runApp } from '../app.js';

const app = runApp();

describe('Why Us CRUD', () => {
  it('should return reasons when GET /api/porque-a-vivo', async () => {
    const response = await request(app).get('/api/porque-a-vivo');

    expect(response.status).to.equal(200);
    // como checar o body???
  });
});