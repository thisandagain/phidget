/**
 * Test suite
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,
    phidget = require(__dirname + '/../lib/index.js');

var target  = new phidget.servo();

/**
 * Suite
 */
async.auto({

    test:   function (callback, obj) {
        test('Component definition', function (t) {
            t.type(target, 'object', 'Component should be an object');
            t.type(target.ready, 'boolean', 'Value should be a boolean');
            t.type(target.attach, 'function', 'Method should be a function');
            t.type(target.close, 'function', 'Method should be a function');
            t.type(target.setEngaged, 'function', 'Method should be a function');
            t.type(target.getPosition, 'function', 'Method should be a function');
            t.type(target.setPosition, 'function', 'Method should be a function');
            t.type(target.getStopped, 'function', 'Method should be a function');
            t.end();
        });

        callback();
    }

}, function (err, obj) {
    test('Catch errors', function (t) {
        t.equal(err, null, 'Errors should be null');
        t.end();
    });
});