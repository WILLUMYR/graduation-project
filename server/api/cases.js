const router = require('express').Router();
// const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Cases = require('../models/Cases');
const Patient = require('../models/Patients');

router.post('/', auth, async (req, res, next) => {
  const { patientId, psychologistId, issue, closed } = req.body;
  const newCase = new Cases({
    patientId,
    psychologistId,
    issue,
    closed,
    messages: [],
    notes: [],
  });

  //

  newCase.save((err, newCase) => {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
});

router.get('/:id', async (req, res, next) => { });

router.post('/:id', async (req, res, next) => { });

router.get('/', async (req, res, next) => {
  // const unassigned = req.params.unassigned;
  // const assignedToId = req.params.assignedToId;
});

module.exports = router;
