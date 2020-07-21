const assert = require('assert');
const request = require('supertest');
const { MongoClient } = require('mongodb');
const {
  createPatient
} = require('./apiFunctions');

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

    const req = {
      body: {
        username: 'John Doe',
        password: 'secret',
        email: 'johndoe@mail.com',
        gender: 'male'
      }
    }
    await createPatient(req);

    const insertedUser = await patients.findOne({ username: 'John Doe' });
    expect(insertedUser).toEqual(req.body);
  });
});
