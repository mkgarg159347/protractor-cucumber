/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';
var mail = require('gulp-mail');
var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
var mkdirp = require('mkdirp');
var cucumber_junit2 = require('cucumber-junit');
var htmlReporter = require('gulp-protractor-cucumber-html-report');
var fs = require('fs');
var sauceConnectLauncher = require('sauce-connect-launcher');
var runSequence = require('run-sequence');
//var googleReport = require('lt-auto-tps-updater');

var config = require('./config');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', function() {
    var color = $.util.colors.green;
    $.util.log('Here are the available tasks:');
    $.util.log(color('    gulp validate --> JSHint your JavaScript files'));
    $.util.log(color('    gulp clean --> Clear the reports directory'));
    $.util.log(color('    gulp dev --> Run automated tests against DEV environment'));
    $.util.log(color('    gulp qa --> Run automated tests against QA environment'));
    $.util.log(color('    gulp dev:remote --> Run automated tests against DEV environment in SauceLabs'));
    $.util.log(color('    gulp qa:remote --> Run automated tests against QA environment in SauceLabs'));
});

gulp.task('webdriver-update', $.protractor.webdriver_update);
gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

// add task to create reports directory (if not already there) and delete the contents
gulp.task('clean', function(cb) {
    del(['reports/**/*'], cb);
});

var smtpInfo = {
    auth: {
        user: 'mkgarg159347@gmail.com',
        pass: 'Godmother@229703'
    },
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465
};

gulp.task('submit-reports', function() {
    return gulp.src('./mails/i-love-you.html')
        .pipe(mail({
            subject: 'Surprise!?',
            to: [
                'mkgarg159347@gmail.com'
            ],
            from: 'mkgarg159347@gmail.com',
            smtp: smtpInfo
        }));

});

gulp.task('validate', function() {
    return gulp.src('features/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('reports:junit', function(cb) {
    var inputJson = fs.readFileSync(path.join(__dirname, 'reports/cucumber_report.json'));
    var xml = cucumber_junit2(inputJson, { indent: '    ' });
    mkdirp('reports/junit');
    fs.writeFile('reports/junit/cucumber_report.xml', xml, cb);
});

gulp.task('reports:html', function() {
    return gulp.src('./reports/cucumber-test-results.json')
        .pipe(htmlReporter({
            dest: 'reports/html/'
        }));
});


/**
 * Orchestration tasks
 */
gulp.task('local', ['validate'], function(callback) {
    return runSequence(
        ['webdriver-update', 'clean'],
        'run:local', ['reports:junit', 'reports:html'],
        'submit-reports',
        callback);
});

gulp.task('dev', ['validate'], function(callback) {
    return runSequence(
        ['webdriver-update', 'clean'],
        'run:dev', ['reports:junit', 'reports:html'],
        'submit-reports',
        callback);
});

gulp.task('dev:remote', ['validate'], function(callback) {
    return runSequence(
        ['webdriver-update', 'clean'],
        'run:dev:remote', ['reports:junit', 'reports:html'],
        'submit-reports',
        callback);
});

gulp.task('qa', function(callback) {
    return runSequence(
        ['webdriver-update', 'clean'],
        'run:qa', ['reports:junit', 'reports:html'],
        'submit-reports',
        callback);
});

gulp.task('qa:remote', ['validate'], function(callback) {
    return runSequence(
        ['webdriver-update', 'clean'],
        'run:qa:remote', ['reports:junit', 'reports:html'],
        'submit-reports',
        callback);
});

/**
 * Execution tasks
 */
gulp.task('run:local', function(done) {
    runProtractor({
        args: ['--baseUrl', config.localUrl, '--cucumberOpts.tags', '@dev']
    }, done);
});

gulp.task('run:dev', function(done) {
    process.env.NODE_ENV = 'dev';
    process.env.API_URL = config.devApiUrl;
    runProtractor({
            args: ['--baseUrl', config.devUrl, '--cucumberOpts.tags', '@dev', '--cucumberOpts.tags', '~@TBD']
        },
        done);
});

gulp.task('run:dev:remote', function(done) {
    process.env.API_URL = config.devApiUrl;
    process.env.NODE_ENV = 'dev';
    runRemoteProtractor({
            args: ['--baseUrl', config.devUrl, '--cucumberOpts.tags', '@dev']
        },
        done);
});

gulp.task('run:qa', function(done) {
    process.env.NODE_ENV = 'qa';
    process.env.API_URL = config.qaApiUrl;
    runProtractor({
            args: ['--baseUrl', config.qaUrl, '--cucumberOpts.tags', '@qa', '--cucumberOpts.tags', '~@TBD']
        },
        done);
});

gulp.task('run:qa:remote', function(done) {
    process.env.NODE_ENV = 'qa';
    process.env.API_URL = config.qaApiUrl;
    runRemoteProtractor({
            args: ['--baseUrl', config.qaUrl, '--cucumberOpts.tags', '@qa']
        },
        done);
});

function runProtractor(protractorOptions, done) {

    protractorOptions.configFile = 'protractor.conf.js';

    gulp.src(path.join('features/**/*.feature'))
        .pipe($.protractor.protractor(protractorOptions))
        .on('error', function(err) {
            done();
        })
        .on('end', function() {
            done();
        });

}