const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/patients', (req, res) => {});

app.post('/api/employees', (req, res) => {});

app.post('/api/patients/', (req, res) => {});

app.post('/api/cases', (req, res) => {});

app.post('/api/cases/:id/messages', (req, res) => {});

app.delete('/api/cases/:id', (req, res) => {});

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
