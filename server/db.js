// require('dotenv').config();

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const url = process.env.MONGO_URI;
console.log('--------', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB successfully connected!');
});

// Create a schema for patients
const patientSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  gender: { type: String, enum: ['male', 'female', 'none'] },
  created: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  cases: [{ type: Schema.Types.ObjectId, ref: 'cases' }],
});

// Create a schema for psychologists
const psychologistSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  workingStatus: { type: String, enum: ['active', 'inactive', 'onVacation', 'deactivated'] },
  cases: [{ type: Schema.Types.ObjectId, ref: 'cases' }],
});

// Create a schema for cases
const casesSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'patients', required: true },
  psychologistId: { type: Schema.Types.ObjectId, ref: 'users' },
  activeStatus: { type: Boolean, default: false },
  description: { type: String, required: false },
  created: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false },
  messages: [
    {
      text: { type: String, required: true },
      respondent: { type: String, enum: ['patient', 'psychologist'] },
      respondentId: { type: Schema.Types.ObjectId },
      respondentName: { type: String, required: true },
      created: { type: Date, default: Date.now },
    },
  ],
  notes: [
    {
      text: { type: String, required: true },
      created: { type: Date, default: Date.now },
    },
  ],
});

const Patients = mongoose.model('patients', patientSchema);

const Psychologists = mongoose.model('psychologists', psychologistSchema);

const Cases = mongoose.model('cases', casesSchema);

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

const newCase = new Cases({
  something: 'hello',
});

// newCase.save((err, newCase) => {
//   if (err) return console.error(err);
//   console.log(newCase.id);
// });
