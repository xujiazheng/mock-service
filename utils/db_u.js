const fs = require('fs');
const path = require('path');
/**
 * mockCache: [
 *  {
 *      route: 'list',
 *      data: "成功了",
 *      method: 'get'
 *  }
 * ]
 */
const DATA_FILE = '../cache.data';
const DATA_PATH = path.join(__dirname, DATA_FILE);
// 文件写入
const fswrite = (data = '') => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4), 'utf8'); 
};
// 文件读取
const fsread = () => {
    try {
        return fs.readFileSync(DATA_PATH, 'utf8');
    } catch (e) {
        fswrite();
        return '';
    }
};

// 获取数据
const getData = () => {
    let data = fsread();
    if (!data) {
        return null;
    }
    return JSON.parse(data);
};
// 根据kv值判断对象是否为真
const isTrue = (item, filter) => {
    for (let key in filter) {
        let val = filter[key];
        if ((key in item) && item[key] !== val) {
            return false;
        }
    }
    return true;
};
// 数据查找
const find = (filter, opposite = false) => {
    let data = getData();
    if (!data) {
        return null;
    }
    return !filter ? data : data.filter((item) => (opposite ? !isTrue(item, filter) : isTrue(item, filter)));
};
// 查找一个
const findOne = (filter) => {
    if (!filter) {
        throw new Error('findByRoute first argument cannt undefined');
    }
    let data = find(filter);
    if (!data || data.length === 0) {
        return null;
    }
    return data[0];
};
// 插入数据
const insert = ({method, route, data}) => {
    if (!method || !route || !data) {
        throw new Error('insert need `method`、`route`、`data` arguments');
    }
    method = method.toUpperCase();
    let item = findOne({
        method,
        route,
    });
    if (item) {
        throw new Error(`this route '${route}' ${method} method is already`);
    }
    let dbData = find();
    if (!dbData) {
        dbData = [];
    }
    let newItem = {
        route,
        method,
        data,
    };
    dbData.push(newItem);
    fswrite(dbData);
    return newItem;
};
// 更新数据
const update = (filter, options) => {
    if (!filter || !options) {
        throw new Error('update method takes two parameters, all cant is undefined');
    }
    let data = find();
    if (!data || data.length === 0) {
        return false;
    }
    data.forEach((item) => {
        if (isTrue(item, filter)) { 
            for (let key in options) {
                if (key in item) {
                    item[key] = options[key];
                }
            }
        }
    });
    fswrite(data);
    return true;
};
// 删除数据
const remove = (filter) => {
    if (!filter) {
        return fswrite('');
    }
    let data = find(filter, true);
    fswrite(data);
};

module.exports = {
    find,
    findOne,
    insert,
    update,
    remove,
};