require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = process.env.MONGO_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB successfully connected!');
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
  cases: [String],
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
  patientId: { type: String, required: true },
  healthProId: { type: String, required: false },
  description: { type: String, required: false },
  closed: { type: Boolean, required: true },
  messsages: [{
    message: { type: String, required: true },
    isPatient: { type: Boolean, required: true },
  }],
}, {
  timestamps: true,
});

const Cases = mongoose.model('cases', casesSchema);

const newCase = new Cases({
  patientId: '123',
  healthProId: null,
  description: 'problem...',
  closed: false,
  messsages: [{
    message: 'Thanks for reaching out, one of our health professionals will get to you as soon as possible.',
    isPatient: false,
  }],
});

newCase.save((err, newCase) => {
  if (err) return console.error(err);
  console.log(newCase.id);
});
