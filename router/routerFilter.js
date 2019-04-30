/**
 * 服务接口映射表map，如果当前请求的没有在map中，则为mock数据接口，走mock数据服务
 */
const RouterMap = require('./serviceRouterMap');
const mockService = require('./mockService');
module.exports = async (ctx) => {
    const RequestMap = RouterMap[ctx.method];
    const handle = RequestMap[ctx.url];
    if (handle) {
        await handle(ctx);
    } else {
        await mockService(ctx);
    }
};