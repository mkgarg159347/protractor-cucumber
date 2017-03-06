'use strict';

var validations = function() {

    this.isPageTitleCorrect = function(expectedPageTitle) {
        return browser.getTitle().then(function(actualTitle) {
            return actualTitle.trim() === expectedPageTitle;
        });
    };

    this.isPageHeadingCorrect = function(element, expectedPageHeading) {
        return action.getText(element).then(function(actualHeading) {
            return actualHeading.trim() === expectedPageHeading;
        });
    };

    this.isMessageCorrect = function(element, expectedMessage) {
        return action.getText(element).then(function(actualMessage) {
            return actualMessage.trim() === expectedMessage;
        });
    };

    this.isDisplayed = function(object) {
        return new Promise((res, rej) => {
            wait.waitForElementToBeVisible(object).then(() => {
                res(object.isDisplayed());
            }).catch(err => {
				rej(`Found ${err} for ${object.locator()}`);
			});
        });
    };

    this.isNotDisplayed = function(object) {
        return new Promise((res, rej) => {
            object.isDisplayed().then((result) => {
                res(result);
            }).catch(err => {
				rej(`Found ${err} for ${object.locator()}`);
			});
        });
    };

    this.isSelected = function(object) {
        return new Promise((res, rej) => {
            wait.waitForElementToBeVisible(object).then(() => {
                res(object.isSelected());
            }).catch(err => {
				rej(`Found ${err} for ${object.locator()}`);
			});
        });
    };


    this.isElementPresent = function(object) {
        return new Promise((res, rej) => {
            wait.waitForElementToBePresent(object).then(() => {
                res(object.isPresent());
            }).catch(err => {
				rej(`Found ${err} for ${object.locator()}`);
			});
        });
    };

    this.isEnabled = function(element) {
        return element.isEnabled().then(function(result) {
            return result;
        });
    };
};

module.exports = validations;