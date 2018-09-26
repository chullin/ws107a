const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function (req, res) {
  const path = req.url
  const filePath = '.' + path // 加上路徑
  console.log('filePath='+filePath)
  console.log('req.url',req.url)
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) {
      console.log('err='  +err)
      res.writeHead(404 , {'Content-Type': 'text/html'})
      res.end()
      return
    }
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(file)
    console.log(file)
    res.end()
  })
})

server.listen(3000)

console.log('Server running at http://localhost:3000')