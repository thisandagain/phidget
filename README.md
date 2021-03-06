## Phidget
#### Node.js bindings for the [Phidget](http://www.phidgets.com/) line of USB sensor and control interfaces.

The `phidget` module provides a simple way to to communicate with Phidget boards via Node. Rather than rely on Phidget's webserver interface, the module is based on Phidget's own C library using a series of C++ bindings leveraging `node-gyp` which make it both easy to configure and pretty speedy when compaired to using TCP/IP.

### To Install
First, make sure you have installed the Phidgets driver on your system. Then,
```bash
npm install phidget
```

### Basic Use
In meatspace:
```bash
- Attach a servo to connector "0" on your Phidget "Advanced Servo" board
- Plug-in your board via USB
```

Meanwhile, in [javascript land](http://www.nyan.cat/):
```javascript
var phidget = require('phidget');

var servo = new phidget.servo();
servo.attach(function (err) {
    servo.setEngaged(0, true, function (err) {
        servo.setPosition(0, 90, function (err) {
            servo.setPosition(0, 180, function (err) {
                // It's alive!
            });
        });
    });
});
```

### Documentation
The JS and C++ is pretty thoroughly commented and furthermore tries to follow the [Phidget21 C API](http://www.phidgets.com/docs/Language_-_C/C%2B%2B) conventions where reasonable. While the project is in this early state, reading through the source code comments is a good way to get up and running with each device as it becomes available. That said, I have started a [wiki with examples for each device](https://github.com/thisandagain/phidget/wiki).

### Currently Supported Devices
- [Advanced Servo](https://github.com/thisandagain/phidget/wiki/Advanced-Servo) (8 and 1 Motor Versions)

### In Progress
- RFID
- 8/8/8 Interface Kit
- Bipolar Stepper Controller

### To Test
```bash
npm test
```

---

### Contribution
Want to contribute? OMGFTWBBQ you're awesome! ...but, please try to follow these common sense guidelines:
- Write a test
- Follow the established format conventions
- Comment your code

### FAQ
- **Will this work with the Arduino?** Nope. But there are already a [couple](https://github.com/rwldrn/johnny-five) [really](https://github.com/jgautier/firmata) [great](https://github.com/voodootikigod/node-serialport) Node.js projects for the Arduino that you should check out.

- **Why Phidgets?** I've used Phidgets for a number of strange things over the years – from installations in football stadiums to traveling exhibits to even toy prototypes and have found them to be particularly easy to work with and generally robust given how inexpensive they are. The `phidget21` C library is also [well documented](http://www.phidgets.com/documentation/web/cdoc/index.html) and provides a good base on which to build bindings.
