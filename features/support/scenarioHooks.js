'use strict';
/**
 * This file is used for setting up before/after hooks related to scenarios
 */

module.exports = function() {
	/**
	 * this code will be run before each scenario
	 */

	this.Before(function(scenerio, callback) {
		console.log('===Performing BeforeScenario');
		callback();
	});

	/**
	 * this code will be run after each scenario
	 */
	this.After(function(scenario, callback) {

		console.log('===Performing AfterScenario');

		// take screenshot if failed
		if (scenario.isFailed()) {
			browser.takeScreenshot().then(function(png) {
//				var fs = require('fs');
//				var stream = fs.createWriteStream("reports/screenshot.png");
//				stream.write(new Buffer(png, 'base64')); stream.end();
				var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
//				var decodedImage = new Buffer(png, 'base64').toString('binary');
				scenario.attach(decodedImage, 'image/png');
				callback();
			});
		} else {
			callback();
		}
	});


	// Example tag-specific after scenario hook
	// this.After('@adam-after', function () {
	//    las.logout().then(function() {
	//        return browser.driver.manage().deleteAllCookies();
	//    }).then(function(){
	//        return browser.driver.sleep(100);
	//    });
	// });

};