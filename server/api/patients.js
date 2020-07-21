require('dotenv').config();
const express = require('express');
const router = express.Router();
const Patients = require('../models/Patients');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/',
  [
    check('username', 'username is required')
      .not()
      .isEmpty(),
    check('email', 'please input a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters.').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, email, gender } = req.body;
    try {
      let patient = await Patients.findOne({ username });

      if (patient) {
        res.status(400).json({ errors: [{ msg: 'User already exists.' }] })
      }

      const newPatient = new Patients({
        username,
        password,
        email,
        gender,
        cases: [],
      });

      const salt = await bcrypt.genSalt(10);

      newPatient.password = await bcrypt.hash(password, salt)

      await newPatient.save()

      const payload = {
        patient: {
          id: newPatient.id,
          cases: newPatient.cases,
        }
      }

      jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 36000000 }, (err, token) => {
        if (err) throw err;
        res.json(token);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error')
    }
  });

router.delete('/:id', (req, res) => { });

module.exports = router;
