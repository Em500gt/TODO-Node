const express = require('express');
const app = express();
const router = require('./routes/index.js');
require('dotenv').config();
const PORT = process.env.MY_PORT;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
})