const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    gender: { type: String, enum: ['male', 'female', 'none'] },
    lastLogin: { type: Date, default: Date.now },
    cases: [{ type: Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = Patients = mongoose.model('patients', PatientSchema);
