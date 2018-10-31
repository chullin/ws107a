
const Koa = require('koa');
const koaBody = require('koa-body');
const serve = require('koa-static'); // 可以在網站上看各種檔名

const app = module.exports = new Koa();
//     在 test 檔，會被 require 所以要輸出 module.exports

// app.use(serve('.'));
app.use(serve('.'));

app.use(koaBody({    // 限制內容大小只能1kb
  jsonLimit: '1kb'
}));

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(async function(ctx) {
  if (ctx.url !== '/uppercase') return
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name.toUpperCase() };  // 小寫全部轉換成大寫
});
 
if (!module.parent) app.listen(3000);
