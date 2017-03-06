'use strict';

/**
 * This file is used to generate a test result json file used by
 * the html reporter for a friendly visual of passed/failed cases
 */

var Cucumber = require('cucumber'),
    fs = require('fs'),
    path = require('path');

var JsonFormatter = Cucumber.Listener.JsonFormatter();

var reportDirectory = 'reports/';
var reportFileName = 'cucumber-test-results.json';

var reportDirectoryPath = path.join(__dirname, '../../' + reportDirectory);
var reportFilePath = path.join(reportDirectoryPath + reportFileName);

function mkdirp(path, root) {
  var dirs = path.split('/'),
    dir = dirs.shift(),
    newRoot = (root || '') + dir + '/';

  try {
    fs.mkdirSync(newRoot);
  } catch (e) {
    if(!fs.statSync(newRoot).isDirectory()) {
      throw new Error(e);
    }
  }

  return !dirs.length || mkdirp(dirs.join('/'), root);
}

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    fs.open(reportFilePath, 'w+', function (err, fd) {
      if (err) {
        mkdirp(reportDirectoryPath);
        fd = fs.openSync(reportFilePath, 'w+');
      }

      fs.writeSync(fd, json);

      console.log('json file location: ' + reportFilePath);
    });
  };

  this.registerListener(JsonFormatter);
};