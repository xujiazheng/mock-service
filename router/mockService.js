const {findOne} = require('../utils/db_u');
const {delay} = require('../utils/tool_u');

module.exports = async (ctx) => {
    const url = ctx.url;
    const method = ctx.method;
    const route = url.slice(1);

    const findData = findOne({
        route,
        method,
    });
    const result = findData && findData.data;
    if (findData && findData.timeout) {
        ctx.body = await delay(findData.timeout, result);
    } else {
        ctx.body = result;
    }
};