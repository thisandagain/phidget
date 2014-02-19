/**
 * Dependencies
 */
var phidget = require('../lib/index.js');

/**
 * Test sequence
 */
var bridge = new phidget.bridge();
bridge.attach(function (err) {
    bridge.setEngaged(0, true, function (err) {
        bridge.setPosition(0, 90, function (err) {
            bridge.setPosition(0, 180, function (err) {
                bridge.getPosition(0, function (err, pos) {
                    console.log('Test complete. Servo position: ' + pos);
                });
            });
        });
    });
});

bridge.attach(function (err) {
});
