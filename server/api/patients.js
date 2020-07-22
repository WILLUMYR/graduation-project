const router = require('express').Router();
const { Patients } = require('../models');
const { createPatient } = require('./apiFunctions');

// signup
router.post('/', async (req, res, next) => {
  try {
    const newPatient = await createPatient(req.body);
    console.log(newPatient);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const patient = await Patients.findOne({ username, password });

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    //To set a expiration date for our cookies
    res.cookie('token', patient._id, { expires: tomorrow }).send();
  } catch (err) {
    next(err);
  }
});

// get currentUserDetails and cases
router.get('/', async (req, res, next) => {
  try {
    let patientId = req.cookies.token;
    if (!patientId) {
      throw 'No token';
    }
    let patient = await Patients.findById(patientId).populate('cases').exec();

    const activeCase = patient.cases.find(obj => obj.closed === false);

    if (activeCase === undefined) {
      patient.cases = [];
    } else {
      patient.cases = [activeCase];
    }

    res.json(patient);
  } catch (error) {
    next(error);
  }
});

module.exports.router = router;
