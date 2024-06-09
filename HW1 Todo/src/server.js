const express = require('express');
const app = express();
const router = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger-Spec.js');
require('dotenv').config();
const Sentry = require("@sentry/node");
const mongoose = require('mongoose');
const connectDb = require('./config/db.js');

Sentry.init({
  dsn: process.env.SENTRY,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Ошибка парсинга JSON:', err);
    Sentry.captureException(err);
    return res.status(400).json({ error: 'Некорректные данные в теле запроса' });
  }
  next(err);
});

app.use('/', router);

connectDb();
mongoose.connection.once('open', () => {
  console.log('Connect mongoose DB');
  app.listen(process.env.MY_PORT, () => console.log('Server start'))
})

module.exports = app;