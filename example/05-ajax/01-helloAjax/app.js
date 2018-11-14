const serve = require('koa-static'); // 匯出目前資料夾
const Koa = require('koa');
const app = new Koa();

app.use(serve('.'));  // 靜態提供server

module.exports = app.listen(3000);

console.log('listening on port 3000');