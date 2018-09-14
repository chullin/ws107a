const http = require('http');  // 引用 http 這個模組，node 專用

const port = 3000, hostname = 'localhost' // 創建

const server = http.createServer((req, res) => {  //回呼函數
  res.statusCode = 200;  // http 回傳 200 代表網頁正常
  res.setHeader('Content-Type', 'text/html'); // text/plain回傳網頁為純文字  text/html 傳回格式為html
  res.end('<p>Hello World\n</p> <a href="http://tw.youtube.com">Youtube</a>\n'); // end 可以回傳一個訊息
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


