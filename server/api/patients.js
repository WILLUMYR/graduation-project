require('dotenv').config();
const express = require('express');
const router = express.Router();
const Patients = require('../models/Patients');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
      console.log('hlhafldsø');

      if (patient) {
        res.status(400).json({ errors: [{ msg: 'User already exists.' }] })
      }

      const newPatient = new Patients({
        username,
        password,
        email,
        gender,
        lastLogin,
        cases: [],
      });

      const salt = await bcrypt.genSalt(10);

      newPatient.password = await bcrypt.hash(password, salt)

      await newPatient.save()

      // return jwt
      res.status(201).send('userRegistered')
    } catch (err) {
      res.status(500).send('Server error')
    }
  });

router.delete('/:id', (req, res) => { });

module.exports = router;
