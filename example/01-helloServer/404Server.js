const http = require('http');  // 引用 http 這個模組，node 專用

const port = 3000, hostname = 'localhost' // 創建
                              // 請求, 回應 (request, response)
const server = http.createServer((req, res) => {  //回呼函數
  res.statusCode = 404;  
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});