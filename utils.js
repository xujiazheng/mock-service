const fs = require('fs');

const dataHandle = {
    filePath: './cache.data',
    get() {
        const data = dataHandle.read();
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    getItem(key) {
        let data = dataHandle.get();
        if (!data || !key) {
            return '';
        }

        let val = data[key];
        return val;
    },
    addItem(key, val) {
        let data = dataHandle.get();
        if (!data) {
            data = {};
        }
        if (data[key]) {
            throw new Error('已存在该路由');
        }
        data[key] = val;
        dataHandle.write(data);
    },
    remove(key) {
        let data = dataHandle.get();
        if (!data) {
            return;
        }
        if (!key) {
            dataHandle.write();
            return;
        }
        let item = data[key];
        if (!item) {
            return;
        }
        let resultData = Object.keys(data)
            .filter((item) => item !== key)
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
        dataHandle.write(resultData);
    },
    update(key, val) {
        if (!key || !val) {
            return false;
        }
        let data = dataHandle.get();
        if (!data) {
            return false;
        }
        let item = data[key];
        if (!item) {
            return false;
        }
        data[key] = val;
        dataHandle.write(data);
    },
    read() {
        try {
            return fs.readFileSync(this.filePath, 'utf8');
        } catch (e) {
            return '';
        }
    },
    write(data = '') {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 4), 'utf8'); 
    },
};

module.exports = {
    dataHandle,
};
