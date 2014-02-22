/**
 * Test suite
 *
 * @package phidget
 * @author Sinyeol An <Sinyeol.An@gmail.com>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    test    = require('tap').test,
    phidget = require(__dirname + '/../lib/index.js');

var target  = new phidget.bridge();

/**
 * Suite
 */
async.auto({

    test:   function (callback, obj) {
        test('Component definition', function (t) {

            t.type(target, 'object', 'Component should be an object');
            t.type(target.ready, 'boolean', 'Value should be a boolean');
            t.type(target.GAIN, 'object', 'Enum should be an object');
            t.type(target.GAIN._1, 'number', 'Member of enum should be a number');
            t.type(target.GAIN._8, 'number', 'Member of enum should be a number');

            t.type(target.GAIN._16, 'number', 'Member of enum should be a number');
            t.type(target.GAIN._32, 'number', 'Member of enum should be a number');
            t.type(target.GAIN._64, 'number', 'Member of enum should be a number');
            t.type(target.GAIN._128, 'number', 'Member of enum should be a number');
            t.type(target.GAIN._UNKNOWN, 'number', 'Member of enum should be a number');

            t.type(target.attach, 'function', 'Method should be a function');
            t.type(target.close, 'function', 'Method should be a function');
            t.type(target.setEnabled, 'function', 'Method should be a function');
            t.type(target.setGain, 'function', 'Method should be a function');
            t.type(target.setDataRate, 'function', 'Method should be a function');

            t.type(target.getValue, 'function', 'Method should be a function');
            t.type(target.getMax, 'function', 'Method should be a function');
            t.type(target.getMin, 'function', 'Method should be a function');
            t.type(target.getEnabled, 'function', 'Method should be a function');
            t.type(target.getGain, 'function', 'Method should be a function');

            t.type(target.getDataRate, 'function', 'Method should be a function');

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
