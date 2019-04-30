
const delay = (timeout, data) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(data);
    }, timeout);
});

module.exports = {
    delay,
};
