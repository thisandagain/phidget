## Phidget
#### Node.js bindings for the Phidget line of USB sensor and control interfaces.

The `phidget` module provides a simple way to to communicate with Phidget boards via Node. Rather than rely on Phidget's webserver interface, the module is based on Phidget's own C++ library using a series of C++ bindings leveraging `node-gyp` which make it both easy to configure and pretty speedy when compaired to using TCP/IP.

### To Install
```bash
npm install phidget
```

### Basic Use
In meatspace:
```bash
- Install the Phidget library for your system (ok... pseduo meatspace)
- Attach a servo to connector "0" on your Phidget servo board
- Plug-in your board via USB
```

Meanwhile, in javascript land:
```javascript
var phidget = require('phidget');

var servo   = new phidget.servo(function (err) {
    servo.setPosition(0, 90, function (err) {
        // It's alive!
    });
});
```

### Less Basic Use
```javascript

```

### RTFC
All C++ and JS code is thoroughly commented and furthermore tries to follow the [Phidget21 C API](http://www.phidgets.com/docs/Language_-_C/C%2B%2B) conventions where reasonable. While the project is in this early state, reading through the source code comments is probably the best way to get up and running with each device as it becomes available.

### Currently Supported Devices
- Advanced Servo (8 and 1 Motor Versions)

### Planned Devices
- 8/8/8 Interface Kit
- RFID
- Bipolar Stepper Controller

### To Test
```bash
npm test
```

---

### Contribution
Want to contribute? OMGFTWBBQ you're awesome! ...but, please try to follow these common sense guidelines:
- Write a test
- Don't break the build (see Travis-CI spec)
- Follow the established format convention
- Comment your code

### FAQ
- **Will this work with the Arduino?** Nope. But there are already a [couple]() [really]() [great]() Node.js projects that support the Arduino that you should check out.

- **Why Phidgets?** I've used Phidgets for a number of strange things over the years – from installations in football stadiums to traveling exhibits to even toy prototypes and have found them to be particularly easy to work with and generally pretty robust given how inexpensive they are. The `phidget21` C++ library is also pretty well documented and provided a good base on which to build bindings.
