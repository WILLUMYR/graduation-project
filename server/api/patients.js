require('dotenv').config();
const router = require('express').Router();
const Patients = require('../models/Patients');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

/** Route     POST api/patients
 * Desc      Create new user and get token
 * Access    Public
 */
router.post(
  '/',
  [
    check('username', 'username is required').trim().not().isEmpty(),
    check('email', 'email should contain @ and . characters').optional().isEmail(),
    check('password', 'please enter a password with 6 or more characters.').trim().isLength({
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

      const email = req.body.email ? req.body.email : undefined;

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

    patient.cases = activeCase ? [activeCase] : [];

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
      res.status(401).send('Not authorized');
      return;
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      res.status(401).send('Not authorized');
      return;
    }

    const payload = {
      patient: {
        id: patient.id,
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