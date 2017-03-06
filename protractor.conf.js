'use strict';

/**
 * Here are reference urls
 * Protractor config: https://github.com/angular/protractor/blob/master/docs/referenceConf.js
 *
 */

exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.

    multiCapabilities: [{
        'browserName': 'chrome'
    }],

    baseUrl: '',

    onPrepare: function() {
        // waits
        protractor.shortWait = 10000; // 10 sec
        protractor.longWait = 90000; // 90 sec

        // convert String to camelCase
        String.prototype.toCamelCase = function() {
            return this.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        };
        protractor.projectRootPath = __dirname + '/';
        protractor.libPath = __dirname + '/features/support/lib/';
        protractor.dataPath = __dirname + '/features/support/data/';
        protractor.pagesPath = __dirname + '/features/support/pages/';
        
    },

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 22000,

    // How long to wait for a page to load.
    getPageTimeout: 20000,

    resultJsonOutputFile: 'reports/cucumber_report.json',

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // Pass options into cucumber
    cucumberOpts: {
        format: 'pretty',
        require: 'features/**/*.js'
    }
};