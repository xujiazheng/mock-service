const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const path = require('path');
const render = require('koa-ejs');
const opn = require('opn');
const app = new Koa();
const serviceRouterFilter = require('./filter/serviceRouterFilter');

port = 80;
let npmCofigArgv = process.env.npm_config_argv;
if (npmCofigArgv) {
    let argv = JSON.parse(npmCofigArgv).original;
    argv = argv.slice(1);
    port = argv[1] || 80;
}

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false,
});

app.use(serviceRouterFilter);

app.use(cors({
    origin: (ctx) => {
        return ctx.header.origin;
    },
    credentials: true,
}));
app.use(bodyParser());
app.use(require('./router/router').routes());
// 异常处理
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});
app.listen(port, () => {
    console.log(`${port}端口正在监听... `);
    opn(`http://localhost:${port}/`);
});
