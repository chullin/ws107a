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
  if (posts == null) return V.fail()
  let list = []
  var count = 1
  for (let post of posts) {
    list.push(`<div>第${count}則：<a href='/list/${post._id}'>${post.title}</a></div>`)
    count++
  }
  
  let content = `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#"><font color="#FF4500">貼文列表</font></a></li>
    <li class="a"><a class="active" href="/post/new"><font color="#FFE4B5">創建新貼文</font></a></li>
    <li class="a"><a class="active" href=/>註冊</a></li>
    <li class="a"><a class="active" href="/gotosigninpage">登出</a></li>
    <li class="a" style="float:right"><a class="active" href="#"><font color="#82FF82"> 此為 ${passport.user} 的留言板</font></a></li>
  </ul>
  <h3>您總共有 <strong>${posts.length}</strong> 則貼文!</h3>
  <ol id="posts">
    ${list.join('\n')}
  </ol>
  `
  return V.layout('貼文列表', content)
}


V.new = function () {
  return V.layout('新增貼文', `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#"><font color="#FF4500">新增貼文：</font></a></li>
    <li class="a"><a class="active" href='#'>創建一則新貼文</a></li>
    </ul>
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

V.getPost = function (post, ctx) {
  return V.layout(post.title, `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href=/list><font color="#FF4500">返回目錄</font></a></li>&nbsp;&nbsp;
    <li class="a"><a class="active" href='/edit/${post._id}'>修改</a></li>&nbsp;&nbsp;
    <li class="a"><a class="active" href='/delete/${post._id}'>刪除</a></li>&nbsp;&nbsp;
  </ul>
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `, ctx)
}

V.edit = function (post) {
  console.log(post._id)
  return V.layout('修改貼文', `
  <ul id="nav">
    <li class="a" style='font-weight:bold'><a class="active" href="#"><font color="#FF4500">修改貼文</font></a></li>
    <li class="a"><a class="active" href='/list/${post._id}'>放棄修改</a></li>&nbsp;&nbsp;
    </ul>
  <form action="/modify/${post._id}" method="post">
    <p><input type="text" name="title" autocomplete="off" value="${post.title}"></p>
    <p><textarea placeholder="Contents" name="body" autocomplete="off">${post.body}</textarea></p>
    <p><input type="submit" value="修改"></p>
  </form>
  `)
  }