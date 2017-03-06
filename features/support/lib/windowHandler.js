'use strict';

var windowHandler = function() {

	//To switch to a particular window when more than one window is open. The function holds the open windows in an array. So the windowNumber input should start with 0
	this.switchToWindow = function(windowNumber) {
		return browser.getAllWindowHandles().then(function(handles) {
			return browser.switchTo().window(handles[windowNumber]);
		}).catch(err => {
			return err;
		});
	};
};

module.exports = windowHandler;