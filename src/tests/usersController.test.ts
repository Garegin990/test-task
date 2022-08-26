import * as request from 'supertest';
import app from "../index";

describe("Test users controller", () => {

    it('POST /api/user/sign-up', function(done) {
    request(app)
      .post('/api/user/sign-up')
      .send({
        email: `tester${Math.random() * 1000}@gmail.com`,
        name: 'testersss',
        phone: '9459787',
        password: '123456'
      })
      .expect(200, done);
  });
});