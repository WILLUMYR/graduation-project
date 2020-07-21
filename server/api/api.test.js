const assert = require('assert');
const request = require('supertest');
const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeEach(async () => {
    await db.collection('COLLECTION_NAME').deleteMany({});
  });

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert patient to the patients collection', async () => {
    const patients = db.collection('patients');

    const mockUser = { _id: '1', username: 'John Doe', password: 'secret', email: 'johndoe@mail.com', gender: 'male' };
    await patients.insertOne(mockUser);

    const insertedUser = await patients.findOne({ _id: '1' });
    expect(insertedUser).toEqual(mockUser);
  });
});
