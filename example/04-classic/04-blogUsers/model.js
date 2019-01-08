const M = module.exports = {}

const db = {
  users: {
    ccc: {
      posts: [
        {id: 0, title: '週三上網站設計', body: '9:10-12:00 在 e321 教室'},
        {id: 1, title: '週四上計算機結構', body: '9:10-12:00 在 e320 教室'},
        {id: 2, title: '週五上軟體工程', body: '9:10-12:00 在 e320 教室'}
      ]
    },
    snoopy: {
      posts: [
        {id: 0, title: '周日吃狗食', body: '照三餐吃'},
        {id: 1, title: '周一吃狗食', body: '只能吃一餐'},
        {id: 2, title: '周二吃狗食', body: '照三餐吃'},
        {id: 3, title: '周三吃狗食', body: '照三餐吃'},
        {id: 4, title: '周四吃狗食', body: '照三餐吃'},
        {id: 5, title: '周五吃狗食', body: '照三餐吃'},
        {id: 6, title: '周六吃狗食', body: '照三餐吃'}
      ]
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    cp: {
      posts: [
        {id: 0, title: '王逸翰', body: '李思慧'},
        {id: 1, title: '馮志揚', body: '林佳誼'},
        {id: 2, title: '王岳駿', body: '黃雅歆'}
      ]
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  }
}

M.listUsers = function () {
  return db.users
}

M.userPosts = function (user) {
  const userTable = db.users[user] || {}
  const posts = userTable.posts
  if (posts == null) throw Error('M.userPosts: fail!')
  return posts
}

M.addPost = function (user, post) {
  const posts = M.userPosts(user)
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.getPost = function (user, id) {
  const posts = M.userPosts(user)
  return posts[id]
}

M.listPosts = function (user) {
  const posts = M.userPosts(user)
  return posts
}
