require('dotenv').config();
const router = require('express').Router();
const mongoose = require('mongoose');
const { Patients, Psychologists, Cases } = require('../models/models');
const { createPatientObj } = require('./apiFunctions');

const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB successfully connected!');
});

router.get('/', (req, res) => res.send('Hello World!'));

router.post('/patients', (req, res) => {});

router.post('/employees', (req, res) => {});

router.post('/cases', (req, res) => {});

router.get('/cases/:id', (req, res) => res.send('test123'));

router.post('/cases/:id', (req, res) => {});

router.delete('/cases/:id', (req, res) => {});

router.delete('/patients/:id', (req, res) => {});

router.get('/api/cases', (req, res) => {
  const unassigned = req.params.unassigned;
  const assignedToId = req.params.assignedToId;
});

module.exports.router = router;
