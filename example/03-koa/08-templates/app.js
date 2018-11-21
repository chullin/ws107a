const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const app = module.exports = new Koa();

// setup views, appending .ejs  ejs是一種模板引擎
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// dummy data

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(async function(ctx) {
<<<<<<< HEAD
  await ctx.render('user1', { user });
=======
//  await ctx.render('user', { user });
  await ctx.render('user2', { user });
>>>>>>> 65d8a2ffdbb0afacec6283d4ac1fc1ca96046c5b
});

if (!module.parent) app.listen(3000);
