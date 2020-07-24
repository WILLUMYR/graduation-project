const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongodatabase = new MongoMemoryServer();

const connectDB = async () => {
  const uri = await mongodatabase.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
}

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodatabase.stop();
}

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = {
  connectDB,
  closeDatabase,
  clearDatabase
}