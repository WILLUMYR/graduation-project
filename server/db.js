require('dotenv').config();

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

const username = process.env.USERNAME;
const secret = process.env.SECRET;
const dbname = process.env.DBNAME;

const url = `mongodb+srv://${username}:${secret}@graduationproject.mr5uk.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const patientSchema = new Schema({
  username: { type: String, required: true },
  userPassword: { type: String, required: true },
  case: {
    caseDescription: { type: Object, required: false },
    caseTaken: { type: Boolean, required: true },
    healthProfessional: { type: Number, required: true },
    messages: [
      {
        message: { type: String },
        isPatient: { type: Boolean },
      },
    ],
  },
});

const Patients = mongoose.model('patients', patientSchema);

const newPatient = new Patients({
  username: 'user name',
  userPassword: 'supersecretpassword',
  case: {
    caseDescription: 'not feeling good',
    caseTaken: false,
    healthProfessional: 123,
    messages: [
      {
        message: 'I need help',
        isPatient: true,
      },
      {
        message: 'Okay, I can help you',
        isPatient: false,
      },
    ],
  },
});

newPatient.save(function (err) {
  if (err) console.log('error');
});
