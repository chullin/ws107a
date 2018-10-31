var fs = require('mz/fs')

async function main() {
  var data1 = await fs.readFile("asyncFile.js", "utf8"); // 讀
  console.log('讀取完成!');
  await fs.writeFile("asyncFile2.js", data1);            // 寫
  console.log('寫入完成!');
  var data2 = await fs.readFile("asyncFile2.js", "utf8");// 再讀
  console.log('又讀取完成 !');
  await fs.writeFile("asyncFile3.js", data2);            // 再寫
  console.log('又寫入完成!');
}

main()
