require('dotenv').config();

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('success!');
});

const patientSchema = new Schema({
  username: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: false },
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

const healthProSchema = new Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  email: { type: String, required: true },
  userPassword: { type: String, required: true },
  cases: [{ caseId: { type: String, required: true } }],
});

const healthPro = mongoose.model('healthPro', healthProSchema);

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

const casesSchema = new Schema({
  something: { type: String }
});

const Cases = mongoose.model('cases', casesSchema);

const newCase = new Cases({
  something: 'hello',
});

newCase.save(function (err, ()=>{}) {
  if (err) console.error(err);
  cb()
});
