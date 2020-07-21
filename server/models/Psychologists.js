const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psychologistSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    workingStatus: { type: String, enum: ['active', 'inactive', 'onVacation', 'deactivated'] },
    cases: [{ type: Schema.Types.ObjectId, ref: 'cases' }],
  },
  {
    timestamps: true,
  },
);

module.exports = Psychologists = mongoose.model('psychologists', psychologistSchema);
