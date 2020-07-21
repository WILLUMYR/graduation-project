const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cases = require('../models/Cases');

router.get('/', (req, res) => {
  // const unassigned = req.params.unassigned;
  // const assignedToId = req.params.assignedToId;
});

router.post('/', (req, res) => {
  const { patientId, issue } = req.body;
  const newCase = new Cases({
    patientId,
    issue,
    closed: false,
    messages: [],
    notes: []
  });

  newCase.save((err, newCase) => {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
});

router.get('/:id', (req, res) => res.send('test123'));

router.post('/:id', (req, res) => { });

router.delete('/:id', (req, res) => { });

module.exports = router;