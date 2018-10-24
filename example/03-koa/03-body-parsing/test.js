const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Body Parsing', function() {
  after(function() {
    server.close();
  });

  describe('POST /uppercase', function() {
    describe('with JSON', function() { // 使用 JSON 格式
      it('should work', function(done) {
        request
        .post('/uppercase')
        .send({ name: 'tobi' })
        .expect(200)
        .expect({ name: 'TOBI' }, done);
      });
    });

    describe('with urlencoded', function() {
      it('should work', function(done) {
        request
        .post('/uppercase')
        .send('name=tj')
        .expect(200)
        .expect({ name: 'TJ' }, done);
      });
    });

    describe('when length > limit', function() {
      it('should 413', function(done) {
        request
        .post('/json')
        .send({ name: Array(5000).join('a') }) // 直接給它 5000 個a
        .expect(413, done);
      });
    });

    describe('when no name is sent', function() {
      it('should 404', function(done) {
        request
        .post('/uppsercase')
        .send('age=10')
        .expect(404, done);
      });
    });
  });
});
