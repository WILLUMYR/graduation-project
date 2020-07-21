const { MongoClient } = require('mongodb');
const { Cases, Patients, Psychologists } = require('./index');

describe('insert', () => {
  let connection;
  let db;

  beforeEach(async () => {
    await db.collection('patients').deleteMany({});
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
    // create object and send to db here!
    //await createPatient(req);

    const insertedUser = await patients.findOne({ username: 'John Doe' });
    console.log(insertedUser);
    expect(insertedUser).toEqual(req.body);
  });
});
