const request = require('supertest');
const server = require('../index');

const { connectDB, clearDatabase, closeDatabase } = require('../test/testdb');

describe('API tests', () => {
  beforeAll(async () => await connectDB());
  beforeEach(async () => await clearDatabase());
  afterAll(async () => {
    await closeDatabase();
    server.close();
  });

  describe('Patient API endpoints', () => {
    describe('Patients - Post', () => {
      it('Returns 201 for successful requests', async (done) => {
        request(server)
          .post('/api/patients')
          .send({
            username: "user100",
            password: "88cF1231dc&&",
          })
          .expect(201)
          .end(done, (err, res) => {
            if (err) return done(err);
            done();
          })
      })
      // Should Return token on successful requests
      // Should give a 400 error (and json in the error format) if the password is less than 6 characters.
      // Should give a 400 error (and json in the error format) if the email is not a valid email.
      // Should be able to log in with this user.
    })
  })
})