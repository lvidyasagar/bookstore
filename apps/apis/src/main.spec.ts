import * as request from 'supertest';
import app from './main';

describe('Express Application', () => {
  it('should run the server and get welcome message on default route ("/")', (done) => {
     request(app)
      .get('/')
      .expect(200)
      .end((err,response) => {
        if(err) return done(err);
        expect(response.body.message).toEqual('Welcome to apis');
        done();
      })
  });

});
