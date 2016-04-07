'use strict';

var _ = require('lodash'),
    //chromedriver = require('chromedriver'),
    parser = require('xml2json'),
    fs = require('fs');

var minutes = function(m) {
  return m*60*1000;
};

var seconds = function(s) {
  return s*1000;
}

var getAppName = _.memoize(function () {
    var parsed = parser.toJson(fs.readFileSync(__dirname + '/../../config.xml'), {object: true});
    return parsed.widget.name;
});

var appiumDefaults = {
  launchTimeout: minutes(1)
};

var androidDefaults = _.extend({
    platformName: 'Android',
    //chromedriverExecutable: chromedriver.path, //Only if needed
    avdLaunchTimeout: minutes(3),
    avdReadyTimeout: minutes(3),
    app: __dirname + '/../../platforms/android/build/outputs/apk/android-debug.apk'
}, appiumDefaults);
var androidEmulator = _.extend({deviceName: 'Android Emulator'}, androidDefaults);

var iosDefaults = _.extend({
    platformName: 'iOS',
    launchTimeout: minutes(3),
    app: __dirname + '/../../platforms/ios/build/emulator/' + getAppName() + '.app'
}, appiumDefaults);


//Android
//Emulators
// exports.Nexus5_API21 = _.extend({
//     avd: 'Nexus5_API21',
//     platformVersion: '5.0.1'
// }, androidEmulator);

//iOS
//Simulators
exports.iPhone6_9_2 = _.extend({
    platformVersion: '9.2',
    deviceName: 'iPhone 6'
}, iosDefaults);

exports.androidDefaults = androidDefaults;
exports.iosDefaults = iosDefaults;

exports.makeReset = function (caps) {
    var resetDefaults = {fullReset: false, noReset: false};
    return _.extend(_.clone(caps), resetDefaults);
};

exports.makeNoReset = function (caps) {
    var noResetDefaults = {fullReset: false, noReset: true};
    return _.extend(_.clone(caps), noResetDefaults);
};
