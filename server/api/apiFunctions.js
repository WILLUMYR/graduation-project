const { Patients, Psychologists, Cases } = require('../models');

const createPatient = (req, res) => {
  // check for username & password
  const { username, password, email, gender } = req.body;
  const newPatient = new Patients({
    username,
    password,
    email,
    gender,
    created: undefined,
    lastLogin: undefined,
    cases: [],
  });
  newPatient.save((err, newPatient) => {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
};

const createCase = (req, res) => {
  // check for username & password
  const { patientId, psychologistId, issue, closed } = req.body;
  const newCase = new Cases({
    patientId,
    psychologistId,
    issue,
    closed,
    messages: [],
    notes: []
  });
  newCase.save((err, newCase) => {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
};



module.exports = {
  createPatient,
  createCase,
};
