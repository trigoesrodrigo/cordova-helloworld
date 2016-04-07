'use strict';

var wd = require('wd'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

// Enrich the driver with helper methods
require('./helpers/overrides');

var caps = require('./helpers/caps');

chai.use(chaiAsPromised);
var should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var minutes = function(m) {
  return m*60*1000;
};

var seconds = function(s) {
  return s*1000;
};

var timeouts = {
  GLOBAL: minutes(15),
  WAITFOR: seconds(20),
  AFTERCONTEXT: seconds(2),
  AFTERINIT: seconds(10),
  AFTERQUIT: seconds(2),
  BEFORECONTEXT: seconds(2),
  BEFOREINIT: seconds(5),
  BEFOREQUIT: seconds(2)
};

describe('Main view', function() {

    var desired = caps.iPhone6_9_2;

    describe('Reset', function() {
        this.timeout(timeouts.GLOBAL);
        var driver;

        before(function() {
            driver = wd.promiseChainRemote('localhost', '4723');

            require('./helpers/logging').configure(driver);

            desired = caps.makeReset(desired);

            return driver
                .sleep(timeouts.BEFOREINIT)
                .init(desired)
                .sleep(timeouts.AFTERINIT);
        });

        after(function() {
            return driver
                .sleep(timeouts.BEFOREQUIT)
                .quit()
                .sleep(timeouts.AFTERQUIT);
        });

        it('should detect webview context', function() {
            return driver.switchToAppWebContext();
        });

        it('should find the body', function() {
            return driver
                .waitForElementByCss('body', timeouts.WAITFOR)
        });
    });

    describe('First suite', function() {
        this.timeout(timeouts.GLOBAL);
        var driver;

        before(function() {
            driver = wd.promiseChainRemote('localhost', '4723');

            require('./helpers/logging').configure(driver);

            desired = caps.makeNoReset(desired);

            return driver
                .sleep(timeouts.BEFOREINIT)
                .init(desired)
                .sleep(timeouts.AFTERINIT);
        });

        after(function() {
            return driver
                .sleep(timeouts.BEFOREQUIT)
                .quit()
                .sleep(timeouts.AFTERQUIT);
        });

        it('should detect webview context', function() {
            return driver.switchToAppWebContext();
        });

        it('should find the body', function() {
            return driver
                .waitForElementByCss('body', timeouts.WAITFOR)
        });
    });

    describe('Second suite', function() {
        this.timeout(timeouts.GLOBAL);
        var driver;

        before(function() {
            driver = wd.promiseChainRemote('localhost', '4723');

            require('./helpers/logging').configure(driver);

            desired = caps.makeNoReset(desired);

            return driver
                .sleep(timeouts.BEFOREINIT)
                .init(desired)
                .sleep(timeouts.AFTERINIT);
        });

        after(function() {
            return driver
                .sleep(timeouts.BEFOREQUIT)
                .quit()
                .sleep(timeouts.AFTERQUIT);
        });

        it('should detect webview context', function() {
            return driver.switchToAppWebContext();
        });

        it('should find the body', function() {
            return driver
                .waitForElementByCss('body', timeouts.WAITFOR)
        });
    });
});
