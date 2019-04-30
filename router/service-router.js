const {
    find,
    insert,
    update,
    remove,
} = require('../utils/db_u');
const Router = require('koa-router');
const router = new Router();

router.get('/data', async (ctx) => {
    ctx.body = find();
});

router.post('/add_item', async (ctx) => {
    const body = ctx.request.body;
    const {
        route,
        data,
        method
    } = body;
    if (!route || !data || !method) {
        return ctx.body = {
            success: false,
            message: '参数错误',
        };
    }
    insert({
        route,
        data,
        method,
    });
   ctx.body = {
       success: true,
   };
});

router.post('/update', async (ctx) => {
    const body = ctx.request.body;
    if (!body.route || !body.data) {
        return ctx.body = {
            success: false,
            message: '参数错误',
        };
    }
    let filter = {
        route: body.route,
    };
    let updateOptions = {
        data: body.data,
    };
    update(filter, updateOptions);
    ctx.body = {
        success: true,
    };
});

router.post('/remove', async (ctx) => {
    const body = ctx.request.body;
    remove({
        route: body.route,
        method: body.method.toUpperCase(),
    });
    ctx.body = {
        success: true,
    };
});

module.exports = router;