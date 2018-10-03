const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server); // supertest 用來測試網頁

describe('Hello World', function() {
  after(function() {
    server.close();
  });

  it('should say "Hello World"', function(done) {
    request
    .get('/')
    .expect(200)
    .expect('Hello World', done);
  });
});

/*
describe()：描述場景或圈出特定區塊，例如：標明測試的功能或 function。
it()      ：撰寫測試案例（Test Case）。
after()   ：在所有測試結束後會執行的程式碼區塊。
*/