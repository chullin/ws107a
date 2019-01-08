const M = module.exports = {}

const posts = []

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

M.list = function () {
  return posts
}
