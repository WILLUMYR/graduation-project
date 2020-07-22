require('dotenv').config();
const router = require('express').Router();
const Patients = require('../models/Patients');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const Patients = require('../models/Patients');


router.post('/',
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
        return res.status(400).json({ errors: errors.array() })
      }

      const { username, password, email, gender } = req.body;

      const newPatient = new Patients({
        username,
        password,
        email,
        gender,
      });

      const salt = await bcrypt.genSalt(10);

      newPatient.password = await bcrypt.hash(password, salt)

      await newPatient.save()

      const payload = {
        patient: {
          id: newPatient.id,
          cases: newPatient.cases, // filter active cases
        }
      }

      jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000000 }, (err, token) => {
        if (err) throw err;

        res.status(201).json({ token });
      });
    } catch (err) {
      next(err);
    }
  }
);

// router.post('/login', async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const patient = await Patients.findOne({ username, password });

//     let tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     //To set a expiration date for our cookies
//     res.cookie('token', patient._id, { expires: tomorrow }).send();
//   } catch (err) {
//     next(err);
//   }
// });

/** Route     GET api/auth
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
    console.error(err.message);
    next(err);
  }
});

// get currentUserDetails and cases
// router.get('/', async (req, res, next) => {
//   try {
//     let patientId = req.cookies.token;
//     if (!patientId) {
//       throw 'No token';
//     }
//     let patient = await Patients.findById(patientId).populate('cases').exec();

//     const activeCase = patient.cases.find(obj => obj.closed === false);

//     if (activeCase === undefined) {
//       patient.cases = [];
//     } else {
//       patient.cases = [activeCase];
//     }

//     res.json(patient);
//   } catch (err) {
//     next(err);
//   }
// });

/** Route     POST api/auth
  * Desc      Authenticate user and get token
  * Access    Public
  */
router.post('/login', async (req, res, next) => {
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
