const http = require('http') // 太低階，基本上不會用這個

http.createServer((req, res) => {
  console.log('url=', req.url)        // req.url 列印在終端機
  console.log('method=', req.method)  // 列印請求資訊
  console.log('headers=', req.headers)

  res.setHeader('Content-Type', 'text/plain')   // 列印在網頁，回應資訊
  res.write('url=' + req.url + '\n')
  res.write('method=' + req.method + '\n\n')
  res.write('headers=' + JSON.stringify(req.headers, null, 2) + '\n')
  res.end()
}).listen(3000)

console.log('Server running at http://hostname:port/')