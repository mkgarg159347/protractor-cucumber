'use strict';

var waitForDataToLoad = function() {

	this.waitDataLoad = function() {
		/*Instruct webdriver to wait until Angular has finished rendering and
		 has no outstanding $http or $timeout calls before continuing*/

		browser.waitForAngular();
	};

	this.waitForNonAngular = function() {
		//Adding sleep to wait for execution to enter AngularJS context (triggered by click event)
		// Informs browser not to look for Angular
		browser.ignoreSynchronization = true;
		return browser.sleep(4000);
	};

	//Wait function for checking an element is visible and enabled for click
	this.waitForElementToBeClickable = function(object) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.elementToBeClickable(object), protractor.longWait));
		});
	};

	//Wait function for given text is present in the element
	this.waitForTextToBePresentInElement = function(object, value) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.textToBePresentInElement(object, value), protractor.longWait));
		});
	};

	//Wait function for checking that an element is present on the DOM of a page and visible
	this.waitForElementToBeVisible = function(object) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.visibilityOf(object), protractor.longWait));
		});
	};

	//Wait function for checking that an element is present on the DOM of a page and visible
	this.waitForElementToBeInVisible = function(object) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.invisibilityOf(object), protractor.longWait));
		});
	};

	//Wait function for checking the selection is selected
	this.waitForElementToBeSelected = function(object) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.elementToBeSelected(object), protractor.longWait));
		});
	};

	//Wait function for checking that an element is present on the DOM of a page and visible
	this.waitForElementToBePresent = function(object) {
		return new Promise((res) => {
			res(browser.wait(protractor.ExpectedConditions.presenceOf(object), protractor.longWait));
		});
	};
};
module.exports = waitForDataToLoad;