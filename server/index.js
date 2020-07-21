const express = require('express');
const cors = require('cors');
const apiAuth = require('./api/auth');
const apiCases = require('./api/cases');
const apiPatients = require('./api/patients');
const apiPsychologists = require('./api/psychologists');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: false, }));

app.use('/api/auth', apiAuth);
app.use('/api/cases', apiPatients);
app.use('/api/patients', apiPatients);
app.use('/api/psychologists', apiPsychologists);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
