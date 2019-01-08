const M = module.exports = {}

const posts = []
const Signup = []
let flag,flagtwo;
let UserID;

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.edit = function (post) {
  const oldpost = posts[post.id]
  console.log('oldpost',oldpost)
  console.log('post',post)

  post.created_at = oldpost.created_at
  posts[post.id] = post
}

M.remove = function (id) {
  let post = posts[id]
  // post.id = null
  posts[id] =null
  return post
}

M.get = function (id) {
  return posts[id]
}

M.getUserId = function (UserId){
  return UserID;
}

M.list = function () {
  return posts
}

M.signup = function (user){
  console.log('user=',user)
  console.log('Signup.length=',Signup.length)
  console.log('user.account.match=',user.account.match(/^[\s]+/))
  console.log('user.password.match=',user.password.match(/^[\s]+/))
  console.log('Signup=',Signup)
  console.log('user.account=',user.account)
  console.log('user.password=',user.password)
  if (Signup.length != 0){ // 如果登入長度為不為0
    console.log('run in 1')
    for(let i=0; Signup[i]; i++) { // 如果與舊帳號相等、帳號為 0、密碼為 0
      if(user.account == Signup[i].account || user.account == user.account.match(/^[\s]+/) || user.password ==  user.password.match(/^[\s]+/)){
        flagtwo = false
        break;
      }
      flagtwo = true
    }
    if(flagtwo == true){
      Signup.push(user)
    }
  } // 正規表達式只能使用match或是函數，不能直接比對
   // 如果登入長度不為 0，帳號或是密碼為 0就不行
  else if(user.account.match(/^[\s]+/) != null){
    if(user.password.match(/^[\s]+/) != null){
      if(user.account != user.account.match(/^[\s]+/) || user.password !=  user.password.match(/^[\s]+/)){
        console.log('run in 2')
        flagtwo = true
        Signup.push(user)
        console.log('user.account=',user.account)
      }
    }
  }
  else { // 如果登入長度為 0
    flagtwo = false
    console.log('run in 3')
  }
  console.log('signup=',Signup)  
  return flagtwo

}

M.signin = function (signin_user){
  for(i = 0; i < Signup.length; i++) {
    console.log('signin_user.account=',signin_user.account)
    console.log(' Signup[i].account=', Signup[i].account)
    console.log('signin_user.password=',signin_user.password)
    console.log('Signup[i].password=',Signup[i].password)
    if(signin_user.account == Signup[i].account){
      UserID = signin_user.account
    } 
    if(signin_user.account == Signup[i].account && signin_user.password == Signup[i].password){
      flag = true
      break;
    }
    else flag = false
    }
  return flag
  
}
