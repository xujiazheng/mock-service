import test from 'ava';
import {
    find,
    findOne,
    insert,
    update,
    remove,
} from '../utils';

test('remove all data success', (t) => {
    remove();
    let data = find();
    t.is(data, null);
});

test('find by not data success', (t) => {
    t.is(find(), null);
});

test('findOne by not data success', (t) => {
    t.is(findOne({}), null);
});

let newItem = {
    route: 'list',
    data: {
        success: true,
        data: {
            list: [
                1, 4, 5,
                {
                    a: 455
                }
            ]
        }
    },
    method: 'GET',
};

test('insert one data success', (t) => {
   let resultItem = insert(newItem);
   t.deepEqual(newItem, resultItem);
});

test('findOne by list route', (t) => {
    t.deepEqual(findOne({
        route: 'list',
    }), newItem);
});

test('update one data success', (t) => {
    let result =  update({
        route: 'list',
    }, {
        data: "被修改过了"
    });
    t.is(result, true);
});

test('update data fail', (t) => {
    t.is(update({
        route: 'sfs',
    }, {}), false);
});

test('remove one data success', (t) => {
    insert({
        route: 'test',
        method: 'get',
        data: 'test'
    });
    remove({
        route: 'test',
    });
    let findTest = findOne({
        route: 'test',
    });
    t.is(findTest, null);
});

test('findOne throw', (t) => {
    t.throws(() => findOne());
});

test('insert throw', (t) => {
    t.throws(() => insert({route: 'aa'}));
});