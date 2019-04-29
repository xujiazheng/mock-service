const {
    findOne,
} = require('../utils');
const Router = require('koa-router');
const router = new Router();

router.get('/get/:key', async (ctx) => {
    let key = ctx.params.key;
    ctx.body = findOne({
        route: key,
        method: 'GET',
    }).data;
});

router.get('/post/:key', async (ctx) => {
    let key = ctx.params.key;
    ctx.body = findOne({
        route: key,
        method: 'POST',
    }).data;
});

module.exports = router;