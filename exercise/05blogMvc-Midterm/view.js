var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>

      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }

      #nav{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
      }
      
      .a{
        float: left;
      }
      
      .a .active{
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }
      
      .a .active:hover {
        background-color: #111;
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

V.list = function (posts, passport) {
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

  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#"><font color="#FF4500">貼文列表</font></a></li>
    <li class="a"><a class="active" href=/>註冊</a></li>
    <li class="a"><a class="active" href="/gotosigninpage">登出</a></li>
    <li class="a" style="float:right"><a class="active" href="#"><font color="#82FF82"> 目前只用者為：${passport.user}</font></li>
  </ul>



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
    <p><input type="text" placeholder="Title" name="title" autocomplete="off"></p>
    <p><textarea placeholder="Contents" name="body" autocomplete="off"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href=/return><font color="#FF4500">返回目錄</font></a></li>&nbsp;&nbsp;
    <li class="a"><a class="active" href=/edit/${post.id}>修改</a></li>&nbsp;&nbsp;
    <li class="a"><a class="active" href=/delete/${post.id}>刪除</a></li>&nbsp;&nbsp;
  </ul>
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `)
}

V.edit = function (post) {
  return V.layout('修改貼文', `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#"><font color="#FF4500">修改貼文</font></a></li>
  </ul>
  <form action="/modify/${post.id}" method="post">
    <p><input type="text" value=${post.title} name="title" autocomplete="off"></p>
    <p><textarea placeholder="Contents" name="body" autocomplete="off">${post.body}</textarea></p>
    <p><input type="submit" value="修改"></p>
  </form>
  `)
  }

V.main = function(){
  return V.layout('註冊', `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#">註冊</a></li>
    <li class="a"><a class="active" href=/gotosigninpage>登入</a></li>
  </ul>
        <form action="/signup" method="post">
          <p>帳號：<input type="text" name='user' id="user" autocomplete="off"></p>
          <p>密碼：<input type="password" name='password' id="password" autocomplete="off"></p>

          <p><input type="submit" value="註冊"></p>
        </form> 
    `)
}

V.signin = function(){
  return V.layout('登入', `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#">登入</a></li>
    <li class="a"><a class="active" href=/gotosignuppage>註冊</a></li>
  </ul>
        <form action="/signin" method="post">
          <p>帳號：<input type="text" name='user' id="user" autocomplete="off"></p>
          <p>密碼：<input type="password" name='password' id="password" autocomplete="off"></p>

          <p><input type="submit" value="登入"></p>
        </form> 
    `)
}

V.success = function (ctx) {
  return V.layout('成功！', `
  <ul id="nav">
    <li class="a"><a class="active" href=/gotosigninpage>登入</a></li>
    <li class="a"><a class="active" href=/>註冊</a></li>
  </ul>
  <br>
  <span style="font-family:Microsoft JhengHei;">註冊成功!</span><br>
  `, ctx)
}

V.failup = function (ctx) {
  return V.layout('成功！', `
  <ul id="nav">
    <li class="a"><a class="active" href=/gotosigninpage>登入</a></li>
    <li class="a"><a class="active" href=/>註冊</a></li>
  </ul>
  <br>
  <span style="font-family:Microsoft JhengHei;">註冊失敗!</span><br>
  `, ctx)
}

V.failin = function (ctx) {
  return V.layout('成功！', `
  <ul id="nav">
    <li class="a"><a class="active" href=/gotosigninpage>登入</a></li>
    <li class="a"><a class="active" href=/>註冊</a></li>
  </ul>
  <br>
  <span style="font-family:Microsoft JhengHei;">登入失敗!</span><br>
  `, ctx)
}