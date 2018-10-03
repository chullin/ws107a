const Koa = require('koa');
const auth = require('koa-basic-auth'); // 密碼認證

const app = module.exports = new Koa();

// custom 401 handling

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that'; // 密碼輸入錯誤後，頁面重新整理，直接被刷掉
      console.log('password is wrong');
    } else {
      throw err;
    }
  }
});

// require auth

app.use(auth({ name: 'tj', pass: 'tobi' }));

// secret response

app.use(async function(ctx) {
  ctx.body = 'secret';
  console.log('Correct');
});

if (!module.parent) app.listen(3000);
