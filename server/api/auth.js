const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Patients = require('../models/Patients');

router.get('/', auth, async (req, res, next) => {
  try {
    const patient = await Patients.findById(req.patient).select('-password');
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;