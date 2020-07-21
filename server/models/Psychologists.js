const mongoose = require('mongoose');

const PsychologistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    workingStatus: { type: String, enum: ['active', 'inactive', 'onVacation', 'deactivated'] },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = Psychologists = mongoose.model('psychologists', PsychologistSchema);
