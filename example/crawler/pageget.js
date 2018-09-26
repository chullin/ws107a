var http = require('http');

<<<<<<< HEAD
http.get('http://localhost:3000/', function(res) { // 不支援https
=======
http.get('http://localhost:3000', function(res) {
>>>>>>> fb1159e6f6ccde511445af103d3baa9e44e62d48
  console.log('Got response: ' + res.statusCode)
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk)
  })
}).on('error', function(e) {
  console.log('Got error: ' + e.message)
})