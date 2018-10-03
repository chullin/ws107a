const Koa = require('koa'); // 類別，可以new一個物件，開頭就會大寫(習慣)
const app = module.exports = new Koa();

app.use(async function(ctx) {
  console.log('url=', ctx.url)
  ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);
