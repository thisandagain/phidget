/**
 * Node.js bindings for the Phidget line of USB sensor and control interfaces.
 *
 * @package phidget
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Constructor
 */
function Phidget () {
    var self = this;  

    self.servo = require('./servo');
};

/**
 * Export
 */
module.exports = new Phidget();
