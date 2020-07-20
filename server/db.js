require('dotenv').config();

const mongoose = require('mongoose');

const username = process.env.USERNAME;
const secret = process.env.SECRET;
const dbname = process.env.DBNAME;

const url = `mongodb+srv://${username}:${secret}@graduationproject.mr5uk.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

let patientSchema = new Schema({
  username: { type: String, required: true },
  userPassword: { type: String, required: true },
  problemDescription: { type: Object, required: false },
  caseTaken: { type: Boolean, required: true },
  healthProfessional: { type: String, required: true },
});

const Patients = mongoose.model('Test', new Schema({ name: String }));
