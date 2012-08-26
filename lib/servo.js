/**
 * Phidget "Advanced Servo" interface
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var binding = require('../build/Release/binding'),
    Util    = require('./util');

/**
 * Constructor
 */
function Servo () {
    var self = this;  

    // State
    self.ready          = false;
    self.attachError    = 'Could not attach to device.';
    self.closeError     = 'Could not close device connection';
    self.typeError      = 'Invalid input type';

    /**
     * Attach device "0".
     * @todo Support multiple devices
     *
     * @return {Err}
     */
    self.attach = function (callback) {
        Util.cb(binding.attach(), 'Could not attach to Phidget', function (err) {
            if (!err) self.ready = true;
            callback(err);
        });
    }

    /**
     * Detach device "0".
     * @todo Support multiple devices
     *
     * @return {Err}
     */
    self.close = function (callback) {
        Util.cb(binding.close(), 'Could not close Phidget connection', function (err) {
            if (!err) self.ready = false;
            callback(err);
        });
    }
};

/**
 * Sets the "engaged" flag for a servo channel.
 *
 * @param {Number} Channel
 * @param {Boolean} Engage flag
 *
 * @return {Err}
 */
Servo.prototype.setEngaged = function (id, engage, callback) {
    var self = this;

    if (typeof id !== 'number' || typeof engage !== 'boolean') {
        callback(self.typeError);
    } else {
        Util.cb(binding.setEngaged(id, Number(engage)), 'Could not engage servo ' + id, callback);
    }
};

/**
 * Returns the position (in degrees) for a specified servo.
 *
 * @param {Number} Channel
 *
 * @return {Number}
 */
Servo.prototype.getPosition = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    } 

    try {
        callback(null, binding.getPosition());
    } catch (err) {
        callback('Could not get servo position');
    }
};

/**
 * Sets the position (in degrees) of a specified servo.
 *
 * @param {Number} Channel
 * @param {Number} Position
 *
 * @return {Err}
 */
Servo.prototype.setPosition = function (id, pos, callback) {
    var self = this;

    if (typeof id !== 'number' || typeof pos !== 'number') {
        callback(self.typeError);
    } else {
        Util.cb(binding.setPosition(id, pos), 'Could not set position of servo ' + id, function (err) {
            callback(err);
        });
    }
};

/**
 * Gets the state of a specified servo. True = stopped.
 *
 * @param {Number} Channel
 *
 * @return {Boolean}
 */
Servo.prototype.getStopped = function (id, callback) {
    if (typeof id !== 'number') {
        return callback(self.typeError);
    }

    try {
        callback(null, Boolean(binding.getStopped(id)));
    } catch (err) {
        return callback('Could not get servo status');
    }
};

/**
 * Export
 */
module.exports = Servo;
