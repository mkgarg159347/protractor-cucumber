'use strict';

/**
 * This file is used for setting up environment properties
 */
const chai = require('chai'),
	chaiAsPromised = require('chai-as-promised'),
	chaiThings = require('chai-things'),
	actionOnElement = require(`${protractor.libPath}actionUtility.js`),
	validation = require(`${protractor.libPath}validation.js`),
	waitForData = require(`${protractor.libPath}waitForData.js`);
module.exports = function() {
	chai
		.use(chaiThings)
		.use(chaiAsPromised);

	// global functions setup
	global.expect = chai.expect;
	global.assert = require('assert');
	global.env = [ process.env.NODE_ENV ];
	global.action = new actionOnElement();
	global.validate = new validation();
	global.wait = new waitForData();
	global.apiUrl = [ process.env.API_URL ];
	this.setDefaultTimeout(60 * 1000 * 2);
	browser.driver.manage().window().maximize();
};