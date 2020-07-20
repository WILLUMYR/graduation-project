const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use('/api', api.router);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
