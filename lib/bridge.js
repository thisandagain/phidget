/**
 * Phidget "Bridge" interface
 *
 * @package phidget
 * @author Sinyeol An <sinyeol.an@gmail.com>
 */

/**
 * Dependencies
 */
var binding = require('../build/Release/binding_bridge'),
    Util    = require('./util');

/**
 * Constructor
 */
function Bridge () {
    var self = this;  

    // State
    self.ready          = false;
    self.attachError    = 'Could not attach to Bridge.';
    self.closeError     = 'Could not close Bridge connection';
    self.typeError      = 'Invalid input type';

    // Enum
    self.GAIN   = {
        _1          : 1,
        _8          : 2,
        _16         : 3,
        _32         : 4,
        _64         : 5,
        _128        : 6,
        _UNKNOWN    : 0
    };

    /**
     * Attach device "0".
     * @todo Support multiple devices
     *
     * @return {Err}
     */
    self.attach = function (callback) {
        Util.cb(binding.attach(), self.attachError, function (err) {
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
        Util.cb(binding.close(), self.closeError, function (err) {
            if (!err) self.ready = false;
            callback(err);
        });
    }
};

////////////////////////////////////////////////////////////////////// SETTER
/**
 * Sets the "enabled" flag for a bridge channel.
 *
 * @param {Number} Channel
 * @param {Boolean} Eabled flag
 *
 * @return {Err}
 */
Bridge.prototype.setEnabled = function (id, enabled, callback) {
    var self = this;

    if (typeof id !== 'number' || typeof enabled !== 'boolean') {
        callback(self.typeError);
    } else {
        Util.cb(binding.setEnabled(id, Number(enabled)), 'Could not enable Bridge ch #' + id, callback);
    }
};

/**
 * Sets the "gain" for a bridge channel.
 *
 * @param {Number} Channel
 * @param {Number} GAIN enum
 *
 * @return {Err}
 */
Bridge.prototype.setGain = function (id, gain, callback) {
    var self = this;

    if (typeof id !== 'number') {
        callback(self.typeError);
    } else {
        switch(gain) {
            case self.GAIN._1:
            case self.GAIN._8:
            case self.GAIN._16:
            case self.GAIN._32:
            case self.GAIN._64:
            case self.GAIN._128:
            case self.GAIN._UNKNOWN:
                Util.cb(binding.setGain(id, gain), 'Could not set Bridge gain ch #' + id, callback);
            default:
                callback(self.typeError);
        }
    }
};

/**
 * Sets the "dataRate" for bridge.
 *
 * @param {Number} data rate
 *
 * @return {Err}
 */
Bridge.prototype.setDataRate = function (dataRate, callback) {
    var self = this;

    if (typeof dataRate !== 'number') {
        callback(self.typeError);
    } else {
        Util.cb(binding.setDataRate(dataRate), 'Could not set Bridge data rate', callback);
    }
};

////////////////////////////////////////////////////////////////////// GETTER
/**
 * Gets the "value" of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Number} value
 */
Bridge.prototype.getValue = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getValue(id));
    } catch (err) {
        callback('Could not get bridge value ch #' + id);
    }
};

/**
 * Gets the "max value" of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Number} max value
 */
Bridge.prototype.getMax = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getMax(id));
    } catch (err) {
        callback('Could not get bridge max value ch #' + id);
    }
};

/**
 * Gets the "min value" of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Number} min value
 */
Bridge.prototype.getMin = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getMin(id));
    } catch (err) {
        callback('Could not get bridge min value ch #' + id);
    }
};

/**
 * Gets the "enabled" flag of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Boolean} Enalbed flag
 */
Bridge.prototype.getEnabled = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getEnabled(id));
    } catch (err) {
        callback('Could not get bridge gain ch #' + id);
    }
};

/**
 * Gets the "gain" of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Number} gain
 */
Bridge.prototype.getGain = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getGain(id));
    } catch (err) {
        callback('Could not get bridge gain ch #' + id);
    }
};

/**
 * Gets the "data rate" of a bridge channel.
 *
 * @param {Number} Channel
 *
 * @return {Number} data rate
 */
Bridge.prototype.getDataRate = function (id, callback) {
    var self = this;

    if (typeof id !== 'number') {
        return callback(self.typeError);
    }
    try {
        callback(null, binding.getDataRate(id));
    } catch (err) {
        callback('Could not get bridge data rate');
    }
};

/**
 * Export
 */
module.exports = Bridge;
