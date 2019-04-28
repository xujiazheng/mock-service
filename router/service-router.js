const {
    dataHandle
} = require('../utils');
const Router = require('koa-router');
const router = new Router();

router.get('/data', async (ctx) => {
    ctx.body = dataHandle.get();
});

router.post('/add_item', async (ctx) => {
    const body = ctx.request.body;
   dataHandle.addItem(body.route, body.mockData);
   ctx.body = {
       success: true,
   };
});

router.post('/update', async (ctx) => {
    const body = ctx.request.body;
    dataHandle.update(body.route, body.mockData);
    ctx.body = {
        success: true,
    };
});

router.post('/remove', async (ctx) => {
    const body = ctx.request.body;
    dataHandle.remove(body.route);
    ctx.body = {
        success: true,
    };
});

module.exports = router;