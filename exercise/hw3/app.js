const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {

  switch (ctx.url) {
    case '/hello': ctx.body = '你好';
    console.log('url=', ctx.url)
    break
 
    case '/name' : ctx.body = '陳憲億'; break
    case '/id'   : ctx.body = '110510536'; break
    default : ctx.status = 404
  }
  // ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);