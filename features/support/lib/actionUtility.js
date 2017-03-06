'use strict';

var onElement = function() {

	/**Perform click operation on the displayed element from array of elements*/
	this.clickOnDisplayedElement = function(object) {
		return new Promise((res, rej) => {
			wait.waitDataLoad();
			wait.waitForElementToBePresent(object.get(0)).then(() => {
				object.isDisplayed().then(displayedElements => {
					displayedElements.map((value, index) => {
						if (value) {
							object.get(index).click().then(() => {
								wait.waitDataLoad();
								res();
							}, (onError) => {
								rej(`Found ${onError} for ${object.locator()}`);
							});
						}
					});
				}).catch(onError => {
					rej(`Found ${onError} for ${object.locator()}`);
				});
			}, (onError) => {
				rej(`Element ${object.locator()} is not present. Check the Stack ${onError}`);
			});
		});
	};

	/**Perform click operation on the element */
	this.clickElement = function(object) {
		return new Promise((res, rej) => {
			wait.waitDataLoad();
			wait.waitForElementToBeClickable(object).then(() => {
				object.click().then(() => {
					wait.waitDataLoad();
					res();
				}, (onError) => {
					rej(`Found ${onError} for ${object.locator()}`);
				});
			}, (onError) => {
				rej(`Element ${object.locator()} is not clickable. Check the Stack ${onError}`);
			});
		});
	};

	/**Perform click operation on the element */
	this.clickElementIfDisplayed = function(object) {
		return new Promise((res, rej) => {
			wait.waitDataLoad();
			wait.waitForElementToBeClickable(object).then(() => {
				object.click().then(() => {
					wait.waitDataLoad();
					res();
				}, (onError) => {
					rej(`Found ${onError} for ${object.locator()}`);
				});
			}, () => {
				res();
			});
		});
	};

	this.sendKeys = function(elm, keys) {
		return new Promise((res, rej) => {
			wait.waitDataLoad();
			wait.waitForElementToBeVisible(elm).then(() => {
				elm.sendKeys(keys).then(() => {
					res();
				}).catch(onError => {
					rej(`Found ${onError} for ${elm.locator()}`);
				});
			}).catch(onError => {
				rej(`Found ${onError} for ${elm.locator()}`);
			});
		});
	};

	this.getText = function(object) {
		wait.waitDataLoad();
		return new Promise((res, rej) => {
			wait.waitForElementToBeVisible(object).then(() => {
				wait.waitDataLoad();
				res(object.getText());
			}).catch(onError => {
				rej(`Found ${onError} for ${object.locator()}`);
			});
		});
	};

	this.clearText = function(object) {
		return new Promise((res, rej) => {
			wait.waitForElementToBeVisible(object).then(() => {
				object.clear().then(() => {
					res();
				});
			}).catch(onError => {
				rej(`Found ${onError} for ${object.locator()}`);
			});
		});
	};

	this.getAttribute = function(object, attribute) {
		return new Promise((res, rej) => {
			wait.waitForElementToBeVisible(object).then(() => {
				res(object.getAttribute(attribute));
			}).catch(onError => {
				rej(`Found ${onError} for ${object.locator()}`);
			});
		});
	};

	this.countOfElements = function(object) {
		return new Promise((res, rej) => {
			wait.waitDataLoad().then(() => {
				res(object.count());
			}).catch(onError => {
				rej(`Found ${onError} for ${object.locator()}`);
			});
		});
	};

};

module.exports = onElement;