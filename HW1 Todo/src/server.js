const express = require('express');
const app = express();
const router = require('./routes/index.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger-Spec.js');
require('dotenv').config();
const PORT = process.env.MY_PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
})