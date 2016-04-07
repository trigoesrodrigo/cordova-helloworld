'use strict';

var wd = require('wd'),
    _ = require('lodash'),
    fs = require('fs'),
    parser = require('xml2json');

var BEFORECONTEXT = 1000,
    AFTERCONTEXT = 1000;

if (!wd.switchToAppWebContext) {
    var getAppId = _.memoize(function () {
        var parsed = parser.toJson(fs.readFileSync(__dirname + '/../../config.xml'), {object: true});
        return parsed.widget.id;
    });

    wd.addPromiseMethod('switchToAppWebContext', function () {
        var driver = this;

        return driver
            .sleep(BEFORECONTEXT)
            .sessionCapabilities().then(function (capabilities) {
                if (capabilities.platform.toLowerCase() === 'android') {
                    return driver.contexts().then(function (contexts) {
                        var webContext = _.find(contexts, function (context) {
                                return context === 'WEBVIEW_' + getAppId();
                            }) || _.last(contexts);

                        console.log('Contexts are: ' + contexts + ' , switching to: ' + webContext);
                        return driver.context(webContext).sleep(AFTERCONTEXT);
                    });
                } else {
                    return driver.contexts().then(function (contexts) {
                        var webContext = _.find(contexts, function (context) {
                                return _.startsWith(context, 'WEBVIEW');
                            }) || _.last(contexts);

                        console.log('Contexts are: ' + contexts + ' , switching to: ' + webContext);
                        return driver.context(webContext).sleep(AFTERCONTEXT);
                    });
                }
            });
    });
}
