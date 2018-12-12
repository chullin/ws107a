var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
      a {
        text-decoration: none;
        font-size: 15px;
        font-style: oblique;
      }
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],input[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text],input[type=password] {
        width: 300px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.list = function (posts, userID) {
  let list = []
  var count = 0
  for (let post of posts) {
    if (post == null) continue
    
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/post/${post.id}">讀取貼文</a></p>
    </li>
    `)
    count++
  }
  let content = `
  <p><h1>貼文列表</h1>
  <h3>登入ID為 <strong>${userID}</strong></h3></p>
  <p><a href="/gotosigninpage">登出</a></p>
  <p>您總共有 <strong>${count}</strong> 則貼文!</p>
  <p><a href="/post/new">創建新貼文</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.layout('貼文列表', content)
}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p>創建一則新貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <a href=/return>返回目錄</a>&nbsp;&nbsp;
    <a href=/edit/${post.id}>修改</a>&nbsp;&nbsp;
    <a href=/delete/${post.id}>刪除</a>&nbsp;&nbsp;
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}

V.edit = function (post) {
  return V.layout('修改貼文', `
  <h1>修改貼文</h1>
  <form action="/modify/${post.id}" method="post">
    <p><input type="text" value=${post.title} name="title"></p>
    <p><textarea placeholder="Contents" name="body">${post.body}</textarea></p>
    <p><input type="submit" value="修改"></p>
  </form>
  `)
  }

V.main = function(){
  return V.layout('註冊', `
  <h1>註冊</h1>
  <a href=/gotosigninpage>登入</a>
    <form action="/signup" method="post">
      <p>帳號：<input type="text" name='account' id="account" ></p>
      <p>密碼：<input type="password" name='password' id="password" ></p>

      <p><input type="submit" value="註冊"></p>
    </form> 
    `)
}

V.signin = function(){
  return V.layout('登入', `
  <h1>登入</h1>
  <a href=/gotosignuppage>註冊</a>
    <form action="/signin" method="post">
      <p>帳號：<input type="text" name='account' id="account" ></p>
      <p>密碼：<input type="password" name='password' id="password" ></p>

      <p><input type="submit" value="登入"></p>
    </form> 
    `)
}
