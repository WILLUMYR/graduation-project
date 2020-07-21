const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api.router);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
