const mongodb = require('mongodb')

const M = module.exports = {}

const posts = []
let UserID;

M.init = async function () {
  M.client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/')
  M.db = M.client.db('123456789')
  M.posts = M.db.collection('posts')
  M.profiles = M.db.collection('profiles')
  M.posts.createIndex({ board: 1, user: 1, file: 1 })
  M.profiles.createIndex({ user: 1 })
}

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

/*M.list = function () {
  return posts
}*/

M.list = async function (user) {
  const posts = await M.posts.find({user: user}).sort({created_at: -1}).toArray()
  return posts
}

M.signup = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  console.log('profile=',profile)
  console.log('"profile == null"=',profile == null)
  return profile == null
}

M.addUser = async function (passport) {
  await M.profiles.insertOne(passport)
}

M.login = async function (user, password) {
  console.log('zzzzzzzzzz')
  let profile = await M.profiles.findOne({user: user})
  console.log('zzzzzzzzzz')
  console.log('password=',password)
  console.log('profile=',profile)
  if(profile == null){return false}
  return (profile.password === password)
}

M.getProfile = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  return profile
}

M.addPost = async function (user, post) {
  if (user == null) return false
  console.log('post.user=',post.user)
  console.log('post.created_at=',post.created_at)
  post.user = user
  post.created_at = new Date()
  let result = await M.posts.insertOne(post)
  console.log('addPost: result.insertedId=', result.insertedId)
  return result.insertedId != null
}

M.getPost = async function (title, body) {
  console.log('oiioiooioooioioioi')
  //console.log(M.posts)
  let post = await M.posts.findOne({title: title, body: body})
  console.log('post=',post)
  return post
}