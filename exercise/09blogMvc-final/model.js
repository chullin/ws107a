const mongodb = require('mongodb')

const M = module.exports = {}

const posts = []

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
  post.created_at = oldpost.created_at
  posts[post.id] = post
}

M.list = async function (user) {
  const posts = await M.posts.find({user: user}).sort({created_at: -1}).toArray()
  return posts
}

M.signup = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  return profile == null
}

M.addUser = async function (passport) {
  await M.profiles.insertOne(passport)
}

M.login = async function (user, password) {
  let profile = await M.profiles.findOne({user: user})
  if(profile == null){return false}
  return (profile.password === password)
}

M.getProfile = async function (user) {
  let profile = await M.profiles.findOne({user: user})
  return profile
}

M.addPost = async function (user, post) {
  if (user == null) return false
  post.user = user
  post.created_at = new Date()
  let result = await M.posts.insertOne(post)
  return result.insertedId != null
}

M.getPost = async function (_id) {
  let post = await M.posts.findOne({"_id": new mongodb.ObjectID(_id)})
  return post
}

M.remove = async function (_id){
  console.log('_id=',_id)
  let post = await M.posts.remove({"_id": new mongodb.ObjectID(_id)})
  console.log('post=',post)
  return post
}

M.update = async function(_id, title, body){
  let post = await M.posts.update({"_id": new mongodb.ObjectID(_id)}, {$set:{title:title, body:body}})
  console.log('post=',post)
  return post
}