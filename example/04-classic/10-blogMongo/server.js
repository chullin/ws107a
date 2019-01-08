const V = require('./view')
const M = require('./model')
const path = require('path')
const logger = require('koa-logger')
const router = require('koa-router')()
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
  .get('/', home)
  .get('/login', showLogin)
  .get('/signup', showSignup)
  .get('/logout', logout)
  .get('/profile', getProfile)
  .post('/login', login)
  .post('/signup', signup)
  .post('/profile', saveProfile)
  .get('/boards', listBoards)
  .get('/:board/posts', boardPosts)
  .get('/:board/post/new', showAddPost)
  .get('/:board/post/:file', getPost)
  .post('/:board/post/', addPost)

app.use(router.routes())

async function home (ctx) {
  ctx.redirect('/boards')
}

async function showLogin (ctx) {
  ctx.body = V.showLogin(ctx)
}

async function showSignup (ctx) {
  ctx.body = V.showSignup(ctx)
}

async function login (ctx) {
  const passport = ctx.request.body
  console.log('passport.user=',passport.user)
  console.log('passport.password=',passport.password)
  if (await M.login(passport.user, passport.password)) {
    ctx.session.user = passport.user
    ctx.redirect(`/${passport.user}/posts`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function signup (ctx) {
  console.log('signup: body=', ctx.request.body)
  const passport = ctx.request.body
  console.log('passport.user=',passport.user)
  if (await M.signup(passport.user)) {
    await M.addUser(passport)
    ctx.body = V.success(ctx)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function logout (ctx) {
  ctx.session.user = null
  ctx.body = V.logout(ctx)
}

async function listBoards (ctx) {
  const boards = await M.listBoards()
  ctx.body = await V.listBoards(boards, ctx)
}

async function boardPosts (ctx) {
  const board = ctx.params.board
  const posts = await M.boardPosts(board)
  ctx.body = await V.boardPosts(board, posts, ctx)
}

async function showAddPost (ctx) {
  const board = ctx.params.board
  ctx.body = await V.showAddPost(board, ctx)
}

async function getProfile (ctx) {
  const myProfile = await M.getProfile(ctx.session.user)
  ctx.body = await V.showProfile(myProfile, ctx)
}

async function getPost (ctx) {
  const post = await M.getPost(ctx.params.board, ctx.params.file)
  if (!post) ctx.throw(404, 'invalid post')
  ctx.body = await V.getPost(post, ctx)
}

async function addPost (ctx) {
  const board = ctx.params.board
  const post = ctx.request.body
  let isSuccess = await M.addPost(ctx.session.user, board, post)
  if (isSuccess) {
    ctx.redirect(`/${board}/posts`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function saveProfile (ctx) {
  const profile = ctx.request.body
  await M.saveProfile(profile)
  ctx.body = V.success(ctx)
}

app.stop = async function () {
  await M.close()
}

app.start = async function () {
  await M.init()
  if (!module.parent) app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

app.start()
