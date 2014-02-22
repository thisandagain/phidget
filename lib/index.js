/**
 * Node.js bindings for the Phidget line of USB sensor and control interfaces.
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 * @contributor Sinyeol An <sinyeol.an@gmail.com>
 */

/**
 * Constructor
 */
function Phidget () {
    var self = this;  

    self.bridge = require('./bridge');
    self.servo = require('./servo');
};

/**
 * Export
 */
module.exports = new Phidget();
