const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { Server } = require('tls');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ extended: false, }));

app.use('/api/auth', require('./api/auth'));
app.use('/api/cases', require('./api/cases'));
app.use('/api/patients', require('./api/patients'));
app.use('/api/psychologists', require('./api/psychologists'));

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
