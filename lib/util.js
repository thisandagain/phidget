/**
 * General utility methods.
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Constructor
 */
function Util () {
    this.prefix = 'Phidget: ';
};

/**
 * Converts boolean response from binding into proper callback.
 *
 * @param {Boolean} Binding method response
 * @param {String, Optional} Error message
 *
 * @return {Err}
 */
Util.prototype.cb = function (response, err, callback) {
    var self = this;

    if (typeof callback === 'undefined') {
        callback = err;
        err = 'Unknown Error';
    }

    err = (response === 0) ? null : self.prefix + err;
    callback(err);
}

/**
 * Export
 */
module.exports = new Util();