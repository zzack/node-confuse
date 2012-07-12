var test = require('tap').test;
var confuse = require('../');

test('lots of configs', function (t) {
    t.same(confuse({ dir : __dirname }), {
        W: 777, q: { w: 7 }, n: 3
    });
    t.same(confuse({ dir : __dirname + '/foo' }), {
        W: 777, q: { w: 7, z: 6 }, n: 2, Z: 666
    });
    t.same(confuse({ dir : __dirname + '/foo/bar' }), {
        W: 777, q: { w: 7, z: 6, y: 5 }, n: 1, Z: 666, Y: 555
    });
    t.same(confuse({ dir : __dirname + '/foo/bar/baz' }), {
        W: 777, q: { w: 7, z: 6, y: 5, x: 4 }, n: 0, Z: 666, Y: 555, X: 444
    });
    t.end();
});
