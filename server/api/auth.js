require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Patients = require('../models/Patients');

/** Route     GET api/auth
  * Desc      Get patient data.
  * Access    Private
  */
router.get('/', auth, async (req, res, next) => {
  try {
    const patient = await Patients.findById(req.patient.id).select('-password');
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


/** Route     POST api/auth
  * Desc      Authenticate user and get token
  * Access    Public
  */
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const patient = await Patients.findOne({ username });

    if (!patient) {
      res.status(400);
      throw new Error('Invalid creedentials');
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      res.status(400);
      throw new Error('Invalid creedentials');
    }

    const payload = {
      patient: {
        id: Patients.id,
        cases: Patients.cases, // filter active cases
      }
    }

    jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;

      res.status(201).json({ token });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
