require('dotenv').config();
const router = require('express').Router();
const Patients = require('../models/Patients');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { isBlank } = require('../helperFunctions');
const { ConnectionStates } = require('mongoose');

/** Route     POST api/patients
 * Desc      Create new user and get token
 * Access    Public
 */
router.post(
  '/',
  [
    check('username', 'username is required').not().isEmpty(),
    check('password', 'please enter a password with 6 or more characters.').isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, gender } = req.body;

      let email = req.body.email;

      if (email === '') {
        email = undefined;
      }

      if (isBlank(username)) {
        res.status(400).send('Wrong input, username should not be blank');
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newPatient = new Patients({
        username,
        password,
        email,
        gender,
      });

      await newPatient.save();

      const payload = {
        patient: {
          id: newPatient.id,
          // cases: newPatient.cases,
        },
      };

      jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 7200 }, (err, token) => {
        if (err) throw err;

        res.status(201).json({ token });
      });
    } catch (err) {
      next(err);
    }
  },
);

/** Route     GET api/patients
 * Desc      Get patient data.
 * Access    Private
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const patient = await Patients.findById(req.patient.id).select('-password').populate('cases').exec();
    const activeCase = patient.cases.find(obj => obj.closed === false);

    if (activeCase === undefined) {
      patient.cases = [];
    } else {
      patient.cases = [activeCase];
    }

    res.json(patient);
  } catch (err) {
    next(err);
  }
});

/** Route     POST api/patients/login
 * Desc      Authenticate user and get token
 * Access    Public
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const patient = await Patients.findOne({ username });

    if (!patient) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      patient: {
        id: patient.id,
        // cases: patient.cases,
      },
    };

    jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 7200 }, (err, token) => {
      if (err) throw err;

      res.status(200).json({ token });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
