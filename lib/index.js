/**
 * Node.js binding for the Phidget21 C++ framework.
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var binding = require('../build/Release/binding');

/**
 * Converts boolean response from binding into proper callback.
 *
 * @param {Boolean} Binding method response
 * @param {String, Optional} Error message
 *
 * @return {Err}
 */
function cb(response, err, callback) {
    if (typeof callback === 'undefined') {
        callback = err;
        err = 'Unknown Error';
    }

    err = (response === 0) ? null : 'Phidget: ' + err;
    callback(err);
}

/**
 * Constructor
 */
function Phidget () {
    var self = this;  

    self.typeError = 'Phidget: Invalid input type';
};

Phidget.prototype.attach = function (callback) {
    var self = this;

    cb(binding.attach(), 'Could not attach to Phidget', callback);
};

Phidget.prototype.close = function (callback) {
    var self = this;

    cb(binding.close(), 'Could not close Phidget connection', callback);
};

Phidget.prototype.setEngaged = function (id, engage, callback) {
    var self = this;

    if (typeof id !== 'number' || typeof engage !== 'boolean') {
        callback(self.typeError);
    } else {
        cb(binding.setEngaged(id, Number(engage)), 'Could not engage servo ' + id, callback);
    }
};

Phidget.prototype.getPosition = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        callback(self.typeError);
    } else {
        callback(null, binding.getPosition());
    }
};

Phidget.prototype.setPosition = function (id, pos, callback) {
    var self = this;

    if (typeof id !== 'number' || typeof pos !== 'number') {
        callback(self.typeError);
    } else {
        cb(binding.setPosition(id, pos), 'Could not set position of servo ' + id, callback);
    }
};

/**
 * Export
 */
module.exports = new Phidget();
