var test = require('tap').test;
var confuse = require('../');
var path = require('path');

test('env', function (t) {
    function config (dir) {
        return {
            dir : path.join(__dirname, dir),
            env : 'beep'
        };
    }
    
    t.same(confuse(config()), {
        W: 777, q: { w: 7 }, n: 3
    });
    t.same(confuse(config('foo')), {
        W: 777, q: { w: 7, z: 606 }, n: 2, Z: 60606
    });
    t.same(confuse(config('foo/bar')), {
        W: 777, q: { w: 7, z: 606, y: 5 }, n: 1, Z: 60606, Y: 555
    });
    t.same(confuse(config('foo/bar/baz')), {
        W: 777, q: { w: 7, z: 606, y: 5, x: 4 }, n: 0,
        Z: 60606, Y: 555, X: 444
    });
    t.end();
});

test('array env', function (t) {
    function config (dir) {
        return {
            dir : path.join(__dirname, dir),
            env : [ 'boop', 'beep' ]
        };
    }
    
    t.same(confuse(config()), {
        W: 777, q: { w: 7 }, n: 3
    });
    t.same(confuse(config('foo')), {
        W: 777, q: { w: 7, z: 616 }, n: 2, Z: 61616
    });
    t.same(confuse(config('foo/bar')), {
        W: 777, q: { w: 7, z: 616, y: 5.5 }, n: 1, Z: 61616, Y: 555
    });
    t.same(confuse(config('foo/bar/baz')), {
        W: 777, q: { w: 7, z: 616, y: 5.5, x: 4 }, n: 0,
        Z: 61616, Y: 555, X: 444
    });
    t.end();
});
