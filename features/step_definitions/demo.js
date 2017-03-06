"use strict";
'esversion: 6';
var demo = function() {

    this.Given(/^I am on the application$/, function() {
        return browser.get('/login');
    });

    this.When(/^Enter the value$/, function(callback) {
        element(by.model('user.name')).sendKeys('Luke').then(() => {
            //			callback();	
            return element(by.model('user.password')).sendKeys('Skywalker');
        }).then(() => {
            callback();
        }).catch(err => {
            callback(err);
        });
    });

    this.Then(/^It should be present there$/, function(callback) {
        browser.driver.sleep(5000);
        expect(action.getText($('#greetings'))).to.eventually.equal('Hellso Luke').and.notify(callback);
    });
};

module.exports = demo;