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
  console.log(user)
  if (Signup.length != 0){
    for(let i=0; Signup[i]; i++) {
      if(user.account == Signup[i].account || user.account == "" || user.password ==  /^[\s]$/){
        flagtwo = false
        break;
      }
      flagtwo = true
    }
    if(flagtwo == true){
      Signup.push(user)
    }
  } else if(user.account != /[\s]+/ || user.password !=  /^[\s]$/){  // 正規表達式只能使用match或是函數，不能直接比對
    flagtwo = true
    Signup.push(user)
    console.log('user.account=',user.account)
  }else flagtwo = flase

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
