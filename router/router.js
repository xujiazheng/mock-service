const Router = require('koa-router');

const mockRouter = require('./mock-router');
const pageRouter = require('./page-router');
const serviceRouter = require('./service-router');

const router = new Router();

router.use(mockRouter.routes());
router.use(pageRouter.routes());
router.use(serviceRouter.routes());

module.exports = router;