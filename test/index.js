var async   = require('async'),
    phidget = require('../lib/index.js');

phidget.attach(function (err) {
    phidget.close(function (err) {
        console.log('DONE!');
    });
});

async.auto({

    attach:     function (callback) {
        phidget.attach(callback);
    }, 

    engage:     ['attach', function (callback) {
        phidget.setEngaged(0, true, callback);
    }],

    up:         ['engage', function (callback) {
        phidget.setPosition(0, 180.0, function (err) {
            if (err) callback(err);
            setTimeout(callback, 10000);
        });
    }],

    down:       ['up', function (callback) {
        phidget.setPosition(0, 20.0, function (err) {
            if (err) callback(err);
            setTimeout(callback, 2000);
        });
    }],

    disengage:  ['down', function (callback) {
        phidget.setEngaged(0, false, callback);
    }]

}, function (err) {
    if (err) console.log(err);
    phidget.close(function (e) {
        console.log('Done!');
    });
});