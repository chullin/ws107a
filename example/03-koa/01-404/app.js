const Koa = require('koa');

const app = module.exports = new Koa();

app.use(async function pageNotFound(ctx) {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404;
  // 優先權  html > json > json 取得最佳優先權配對 (google瀏覽器)
  switch (ctx.accepts('text', 'html', 'json')) { // 可以用 ctx.accepts 來看請求的網頁是哪一類型
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found!'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found!!';
  }
});

if (!module.parent) app.listen(3000);
