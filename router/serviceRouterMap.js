const {
    find,
    insert,
    update,
    remove,
} = require('../utils/db_u');
const fs = require('fs');
const path = require('path');

const GETMAP = {};
const POSTMAP = {};

GETMAP['/favicon.ico'] = async (ctx) => {
    await new Promise((resolve) => {
        let result = fs.readFileSync(path.join(__dirname, '../favicon.ico'));
        resolve(result);
    });
};
GETMAP['/'] = async (ctx) => {
    await ctx.render('index');
};
GETMAP['/mockservice_data'] = async (ctx) => {
    ctx.body = find();
};
POSTMAP['/mockservice_add_item'] = async (ctx) => {
    const body = ctx.request.body;
    const {
        route,
        data,
        method,
        timeout,
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
        timeout,
    });
    ctx.body = {
       success: true,
    };
};
POSTMAP['/mockservice_update'] = async (ctx) => {
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
        timeout: body.timeout,
    };
    update(filter, updateOptions);
    ctx.body = {
        success: true,
    };
};
POSTMAP['/mockservice_remove'] = async (ctx) => {
    const body = ctx.request.body;
    remove({
        route: body.route,
        method: body.method.toUpperCase(),
    });
    ctx.body = {
        success: true,
    };
};

module.exports = {
    GET: GETMAP,
    POST: POSTMAP,
};
