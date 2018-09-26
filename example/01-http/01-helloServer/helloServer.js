const http = require('http');  // 引用 http 這個模組，node 專用

const port = 3000, hostname = 'localhost' // 創建
                              // 請求, 回應 (request, response)
const server = http.createServer((req, res) => {  //回呼函數
  res.statusCode = 200;  // http 回傳 200 代表網頁正常
  res.setHeader('Content-Type', 'text/plain'); // text/plain回傳網頁為純文字
  res.end('Hello World\n'); // end 可以回傳一個訊息
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});