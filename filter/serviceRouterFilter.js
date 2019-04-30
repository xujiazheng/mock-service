const RouterMap = require('../router/serviceRouterMap');

module.exports = async (ctx, next) => {
    const RequestMap = RouterMap[ctx.method];
    const handle = RequestMap[ctx.url];
    if (handle) {
        await handle(ctx);
    } else {
        await next();
    }
};