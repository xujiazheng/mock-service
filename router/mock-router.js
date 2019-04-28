const {
    dataHandle
} = require('../utils');
const Router = require('koa-router');
const router = new Router();

router.get('/get/:key', async (ctx) => {
    let key = ctx.params.key;
    ctx.body = dataHandle.getItem(key);
});

module.exports = router;