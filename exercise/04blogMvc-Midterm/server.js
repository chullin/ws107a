const V = require('./view')    // 所有顯示動作
const M = require('./model')   // 對資料的處理方法
const path = require('path')
const logger = require('koa-logger') // 所有執行動作
const Router = require('koa-router') // 4、5行 =>const Router = require('koa-router')()
const router = new Router()
const koaBody = require('koa-body')
const session = require('koa-session')/**https://www.tutorialspoint.com/koajs/koajs_sessions.htm*/
const koaStatic = require('koa-static')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.keys = ['some secret hurr']   /**https://segmentfault.com/a/1190000013039187*/

const CONFIG = {
  key: 'kdlasfe,dalj.amvlkdajfas', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, /** 这个是确定cookie的有效期，默认是一天*/
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** 表示是否可以通过javascript来修改，设成true会更加安全 */
  signed: true, /** 这个涉及到cookie的安全性 */
  rolling: false, /** 这两个都是涉及到cookie有效期的更新策略 */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

app.use(logger())
app.use(koaBody())
app.use(session(CONFIG, app))
app.use(koaStatic(path.join(__dirname, 'public')))

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
  console.log('signup: body=', ctx.request.body)
  const passport = ctx.request.body
  console.log('passport.user=',passport.user)
  if (await M.signup(passport.user)) {
    await M.addUser(passport)
    //ctx.redirect('/gotosigninpage')
    ctx.body = V.success(ctx)
    console.log('success in')
  } else {
    ctx.status = 401
    ctx.body = V.failup(ctx)
  }
}

async function signin (ctx) {
  const passport = ctx.request.body
  console.log('passport=',passport)
  if (await M.login(passport.user, passport.password)) {
    ctx.session.user = passport.user
    //ctx.redirect(`/${passport.user}/posts`)
    ctx.redirect('/list')
    console.log('true')
  } else {
    ctx.status = 401
    console.log('xxxxxxxxxxxxxxx')
    ctx.body = V.failin(ctx)
  }
}

async function list (ctx) {
  const posts = M.list()
  const passport = ctx.request.body
  console.log('passport=',passport.user)
  ctx.body = await V.list(posts,passport)  
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

app.start = async function () {
  await M.init()
  if (!module.parent) app.listen(3001)
  console.log('Server run at http://localhost:3001')
}

app.start()

/*
Browser  View(顯示)  Server(做剩下)   Model(儲存)
------------------------>|
                         |----------> M.list
           post <--------| <---------- post
           html -------> |
  <---- ctx.body = html |
  ----> {title:ccc,body:ccc}
*/