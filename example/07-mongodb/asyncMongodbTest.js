const MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD
// const assert = require('assert'); 沒用到
=======
>>>>>>> df9ffbbf910075175a18f70c15262785874d67bf

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'test'

async function main() { 
  // Use connect method to connect to the server
  var client = await MongoClient.connect(url) // MongoClient.connect 取得 MongoDB資料庫的引用
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const collection = db.collection('documents') // 開啟一個資料表
  var iresult = await collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ]) // insertone 插入一個 insertmany 插很多比
  console.log("iresult=", iresult)
  var docs = await collection.find({}).toArray()
  console.log('docs=', docs)
  client.close();
  return docs
}

main().catch(function (error) { // 只寫main會以錯誤警告，因為沒有處理錯誤訊息
  console.log('error=', error)
})


/* node.js連接MongoDB
var MongoClient = require('mongodb').MongoClient;
 
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mymondb", function (err, db) {
  if(err) throw err;
  //Write databse Insert/Update/Query code here..
  console.log('mongodb is running!');
  db.close(); //關閉連線
});
*/