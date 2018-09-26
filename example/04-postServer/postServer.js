// 參考 : https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function (req, res) {
  const path = url.parse(req.url)
  console.log('url=', req.url)
  console.log('method=', req.method)
  console.log('headers=', req.headers)
  const filePath = '.' + path.pathname
  console.log('filePath='+filePath)

  let body = [];
  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => { // 如果有收到資料，就將資料放在body後面 chunk 小段資料
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString(); // buffer 文字
    console.log('body=', body)
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  })

  switch (path.pathname) {
    case '/getIt': 
      console.log('path=', path)
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end()
      break
    case '/postIt':
      console.log('path=', path)
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end()
      break
    default:
      fs.readFile(filePath, 'binary', function(err, file) {
        console.log('err='+err);
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'})
          res.end()
          return
        }
        if (/\.html?$/.test(path.pathname))
          res.writeHead(200, {'Content-Type': 'text/html'})
        else
          res.writeHead(200)
        res.write(file, 'binary')
        res.end()
      })
  }
})

server.listen(3000)

console.log('Server running at http://localhost:3000')
