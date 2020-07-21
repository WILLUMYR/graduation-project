const createPatient = (username, password, email = '', gender) => {
  return {
    username,
    password,
    email,
    gender,
    created: undefined,
    lastLogin: undefined,
    cases: [],
  };
};

const createPatientObj = (req, res) => {
  const { username, password, email, gender } = req.body;
  const newPatient = new Patients(createPatient(username, password, email, gender));
  newPatient.save((err, newPatient) => {
    if (err) res.status(500).send(err);
    res.status(201).send();
  });
};

module.exports = { createPatientObj };
