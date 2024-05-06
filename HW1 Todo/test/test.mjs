import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/server.js';

const request = supertest(app);

describe('POST /register', () => {
  it('Успешная регистрация пользователя', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@test.by',
      password: '123456789',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Пользователь зарегистрирован');
  });

  it('Ошибка на повторную регистрацию', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@test.by',
      password: '123456789',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Данный электронный адресс существует!');
  });

  it('Ошибка на имя', async () => {
    const userData = {
      name: 'tes2113414tuser',
      email: 'test@test.by',
      password: '123456789',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Имя должно состоять только из букв');
  });

  it('Ошибка на Email', async () => {
    const userData = {
      name: 'testuser',
      email: 'testtest.by',
      password: '123456789',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Email не валидный');
  });

  it('Ошибка на пароль', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@test.by',
      password: '19',
      age: 19
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Пароль должен состоять только из цифр, и быть не менеее 6 символов');
  });

  it('Ошибка на возраст', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@test.by',
      password: '123456789',
      age: 1
    };

    const response = await request.post('/register').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Возраст не соответствует (от 18 до 99)');
  });
});

describe('POST /login', () => {
  it('Успешная авторизация пользователя', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };

    const response = await request.post('/login').send(userData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Не успешная авторизация пользователя #1', async () => {
    const userData = {
      email: 'tt@test.by',
      password: '123456789',
    };

    const response = await request.post('/login').send(userData);

    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Неверный email или пароль!');
  });

  it('Не успешная авторизация пользователя #2', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123489',
    };

    const response = await request.post('/login').send(userData);

    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Неверный email или пароль!');
  });

  it('Не успешная авторизация пользователя #3', async () => {
    const userData = {
      password: '123489',
    };

    const response = await request.post('/login').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Email не валидный');
  });

  it('Не успешная авторизация пользователя #4', async () => {
    const userData = {
      email: 'test@test.by',
    };

    const response = await request.post('/login').send(userData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.be.oneOf(['Пароль должен состоять только из цифр, и быть не менеее 6 символов', 'Invalid value']);
  });
});

describe('GET /todos', () => {
  it('Успешный вывод тасок', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };
    const tok = await request.post('/login').send(userData);
    const response = await request.get('/todos').set('Authorization', `Bearer ${tok.body.token}`)
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Ошибка по токену', async () => {
    const response = await request.get('/todos').set('Authorization', `Bearer ${''}`)
    expect(response.status).to.be.oneOf([401, 403]);
    expect(response.text).to.be.oneOf(['Unauthorized', 'Forbidden', 'Invalid token']);
  });

});

describe('POST /todos', () => {
  let token
  it('Успешное создание таски', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };

    const todosData = {
      title: 'Test',
      isCompleted: false
    }

    token = await request.post('/login').send(userData);
    const response = await request.post('/todos')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Task добавлен');
  });

  it('Не успешное создание таски #1', async () => {
    const todosData = {
      isCompleted: false
    }

    const response = await request.post('/todos')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Текст задания отсутствует!');
  });

  it('Не успешное создание таски #2', async () => {
    const todosData = {
      title: 'Test',
    }

    const response = await request.post('/todos')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('IsCompleted -> Должен быть boolean!');
  });
});

describe('PATCH /todos/:id', () => {
  let token;
  let id;
  it('Успешное изменение текста таски', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };

    const todosData = {
      title: 'Test test'
    }

    token = await request.post('/login').send(userData);
    id = await request.get('/todos')
      .set('Authorization', `Bearer ${token.body.token}`);
    const response = await request.patch(`/todos/${id.body[0].id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Title записаны успешно');
  });

  it('Не успешное изменение текста таски #1', async () => {
    const todosData = {
      isCompleted: false
    }

    const response = await request.patch(`/todos/${id.body[0].id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(400);
    expect(response.body.errors[0]).to.have.property('msg');
    expect(response.body.errors[0].msg).to.equal('Текст задания отсутствует!');
  });

  it('Не успешное изменение текста таски #2', async () => {
    const todosData = {
      title: 'Test',
    }

    const response = await request.patch(`/todos/test`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(todosData);

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Task не найден');
  });
});

describe('PATCH /todos/:id/isCompleted', () => {
  let token;
  let id;
  it('Успешное изменение состояния isCompleted', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };

    token = await request.post('/login').send(userData);
    id = await request.get('/todos')
      .set('Authorization', `Bearer ${token.body.token}`);
    const response = await request.patch(`/todos/${id.body[0].id}/isCompleted`)
      .set('Authorization', `Bearer ${token.body.token}`)

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('isCompleted изменен');
  });

  it('Не успешное изменение состояния isCompleted', async () => {
    const response = await request.patch(`/todos/test/isCompleted`)
      .set('Authorization', `Bearer ${token.body.token}`)

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Task не найден');
  });
});

describe('DELETE /todos/:id', () => {
  let token;
  let id;
  it('Успешное удаление таски', async () => {
    const userData = {
      email: 'test@test.by',
      password: '123456789',
    };

    token = await request.post('/login').send(userData);
    id = await request.get('/todos')
      .set('Authorization', `Bearer ${token.body.token}`);
    const response = await request.delete(`/todos/${id.body[0].id}`)
      .set('Authorization', `Bearer ${token.body.token}`)

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Task удален');
  });

  it('Не успешное удаление таски', async () => {
    const response = await request.delete(`/todos/test`)
      .set('Authorization', `Bearer ${token.body.token}`)

    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Task не найден');
  });
});
