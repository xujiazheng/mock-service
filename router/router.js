const {findOne} = require('../utils/db_u');
const {delay} = require('../utils/tool_u');
const Router = require('koa-router');
const router = new Router();

router.get('/:key', async (ctx) => {
    console.log(ctx.url)
    let key = ctx.params.key;
    ctx.body = findOne({
        route: key,
        method: 'GET',
    }).data;
});
router.get('/:key/timeout/:timeout', async (ctx) => {
    let key = ctx.params.key;
    let timeout = ctx.params.timeout;
    ctx.body = await delay(timeout, findOne({
        route: key,
        method: 'GET',
    }).data);
});

router.post('/:key', async (ctx) => {
    let key = ctx.params.key;
    ctx.body = findOne({
        route: key,
        method: 'POST',
    }).data;
});
router.post('/:key/timeout/:timeout', async (ctx) => {
    let key = ctx.params.key;
    let timeout = ctx.params.timeout;
    ctx.body = await delay(timeout, findOne({
        route: key,
        method: 'POST',
    }).data);
});

module.exports = router;