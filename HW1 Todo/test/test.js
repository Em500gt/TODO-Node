// test.js
const chai = require('chai');
// const chai = import('chai') // Вот так работает и если убрать все async, но все ровно с ошибками
const supertest = require('supertest');
const app = require('../src/server.js');

const expect = chai.expect;
const request = supertest(app);

describe('POST /register', () => {
  it('Регистрация пользователя должна быть успешна', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@test.by',
      password: 'testpassword',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('User registered successfully');
  });

  it('Должна возвращать ошибку', async () => {
    const userData = {
      username: 'testuser',
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('Username and password are required');
  });
});