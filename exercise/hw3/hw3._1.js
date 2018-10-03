const Koa = require('Koa');
const app = module.exports = new Koa();

app.use(async function(ctx){
    switch (ctx.url) {
        case '/hello':
        console.log('url=', ctx.url)
        ctx.res.writeHead(200, {'Content-Type': 'text/plain ; charset= UTF-8'});
        ctx.res.end("你好");
        break;
    }
})
if (!module.parent) app.listen(3000);