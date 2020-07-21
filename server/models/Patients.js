const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    gender: { type: String, enum: ['male', 'female', 'none'] },
    lastLogin: { type: Date, default: Date.now },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = Patient = mongoose.model('patients', PatientSchema);
