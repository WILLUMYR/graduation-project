require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
