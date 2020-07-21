require('dotenv').config();
const assert = require('assert');
const request = require('supertest');
const { MongoClient } = require('mongodb');

// describe('The /api API - some starter tests', () => {
//   it('returns Hello!', done => {
//     request(app)
//       .post('/patients')
//       .set('Accept', 'application/json')
//       .expect(response => {
//         console.log(response);
//         assert.strictEqual(response.text, 'Hello!');
//       })
//       .expect(200, done);
//   });
// });

describe('insert', () => {
  let connection;
  let db;

  const url = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});
