const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
