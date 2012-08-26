/**
 * Dependencies
 */
var phidget = require('../lib/index.js');

/**
 * Test sequence
 */
var servo = new phidget.servo();
servo.attach(function (err) {
    servo.setEngaged(0, true, function (err) {
        servo.setPosition(0, 90, function (err) {
            servo.setPosition(0, 180, function (err) {
                servo.getPosition(0, function (err, pos) {
                    console.log('Test complete. Servo position: ' + pos);
                });
            });
        });
    });
});