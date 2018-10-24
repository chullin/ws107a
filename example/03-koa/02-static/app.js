
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// app.use(serve('.')); // 輸出在此資料夾裡所有檔案都可以收尋的到
app.use(_dirname + '/public'); // _dirname 獲得當前執行文件的完整目錄名，與上面的差別是較安全
                               // _dirname + '/public'，只能看到 public 資料夾下的內容
app.listen(3000);

console.log('listening on port 3000');