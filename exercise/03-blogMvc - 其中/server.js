const V = require('./view')    // 所有顯示動作
const M = require('./model')   // 對資料的處理方法
const logger = require('koa-logger') // 所有執行動作
const Router = require('koa-router') // 4、5行 =>const Router = require('koa-router')()
const router = new Router()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
  .get('/',main)
  .post('/signup',signup)
  .get('/gotosigninpage',gotosigninpage)
  .get('/gotosignuppage',gotosignuppage)
  .post('/signin',signin)
  .get('/list', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/edit/:id',edit)
  .get('/return',back)
  .get('/delete/:id',remove)
  .post('/modify/:id', modify)
  .post('/post', create)

app.use(router.routes())

async function main (ctx) {
  ctx.body = await V.main()  
}

async function gotosigninpage (ctx) {
  ctx.body = await V.signin()
}

async function gotosignuppage (ctx) {
  ctx.redirect('/')
}


async function signup (ctx) {
  const user = ctx.request.body
  if(M.signup(user)){
    ctx.body = await V.signin()
  }
  else {
    ctx.body = await V.main()
  }
}

async function signin (ctx) {
  const signin_user = ctx.request.body
  console.log('singinuser=',signin_user)
  if(M.signin(signin_user)) {
    ctx.redirect('/list')
  }
  else {
    ctx.body = await V.signin()
  }
}

async function list (ctx) {
  const posts = M.list()
  const UserId = M.getUserId()
  console.log('UserId=',UserId)
  ctx.body = await V.list(posts, UserId)  
}

async function add (ctx) {
  ctx.body = await V.new()
}

async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

async function edit (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  console.log('post',post)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.edit(post)
}

async function back (ctx) {
  ctx.redirect('/list')
}

async function remove (ctx) {
  const id = ctx.params.id
  const post = M.remove(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.redirect('/list')
}

async function create (ctx) {
  const post = ctx.request.body
  console.log('post=',post)
  M.add(post)
  ctx.redirect('/list')
}

async function modify (ctx) {
  const post = ctx.request.body
  post.id = ctx.params.id
  console.log('post',post)
  M.edit(post)
  ctx.redirect('/list')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}


/*
Browser  View(顯示)  Server(做剩下)   Model(儲存)
------------------------>|
                         |----------> M.list
           post <--------| <---------- post
           html -------> |
  <---- ctx.body = html |
  ----> {title:ccc,body:ccc}
*/