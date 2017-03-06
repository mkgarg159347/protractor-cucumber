# protractor-cucumber
protractor-cucumber allows one to drive protractor tests using cucumber

# Installation

Install Node on your system

Install npm package to dev dependencies

Install Cucumber

npm install -g cucumber

Install protractor

npm install -g protractor

Create a feature file

Below demonstrates how to use protractor-cucumber

Lets create a steps file in features/step_definitions/demo.js

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

Now create a feature file, features/demo.feature

@dev @qa
Feature: Homepage 
  As a user
  I want to visit the homepage
  So that I can access the various features on offer

  Scenario: Demo
    Given I am on the application
    When Enter the value
    Then It should be present there

Now run out test:

gulp qa or qulp dev
