'use strict';

/**
 * Test runner for gulp-cordova-access
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  6 Sep. 2015
 */

// module dependencies
var chai = require('chai'),
    tempfile = require('tempfile'),
    fs = require('fs-extra'),
    path = require('path'),
    os = require('os'),
    gutil = require('gulp-util');

// use should flavour
var should = chai.should();

var access = require('../');

describe('gulp-cordova-access', function() {

    beforeEach(function() {
        this.tmp = tempfile();

        fs.copySync(path.join(__dirname, '/fixtures/config.xml'), path.join(this.tmp, 'config.xml'));
    });

    it('Should throw an error if something went wrong', function(cb) {
        var tmp = tempfile();

        fs.copySync(path.join(__dirname, '/fixtures/config.empty.xml'), path.join(tmp, 'config.xml'));

        // Create the stream
        var stream = access('*', false);

        stream.on('error', function(err) {
            cb();
        });

        // Write the file to the stream
        stream.write(new gutil.File({
            cwd: __dirname,
            base: tmp,
            path: tmp,
            stat: fs.statSync(tmp)
        }));

        stream.end();
    });

    describe('Key-Value pair', function() {

        it('Should remove the access origin if the value is set to false', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '</widget>'
            ];

            // Create the stream
            var stream = access('*', false);

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add the access origin', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="*" />',
                '    <access origin="http://www.google.com" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access('http://www.google.com');

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add the access origin with extra options', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="*" />',
                '    <access launch-external="yes" origin="tel:*" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access('tel:*', {'launch-external': 'yes'});

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });
    });

    describe('Object', function() {

        it('Should remove the access origin if the value is set to false', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '</widget>'
            ];

            // Create the stream
            var stream = access({
                '*': false
            });

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add the access origin', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="*" />',
                '    <access origin="http://www.google.com" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access({
                'http://www.google.com': true
            });

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add the access origin with extra options', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="*" />',
                '    <access launch-external="yes" origin="tel:*" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access({
                'tel:*': {'launch-external': 'yes'}
            });

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add and remove the access origin', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="http://www.google.com" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access({
                '*': false,
                'http://www.google.com': true
            });

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });

        it('Should add multiple access origins', function(cb) {
            var tmp = this.tmp;
            var result = [
                '<?xml version=\'1.0\' encoding=\'utf-8\'?>',
                '<widget>',
                '    <access origin="*" />',
                '    <access origin="http://www.google.com" />',
                '    <access launch-external="yes" origin="tel:*" />',
                '</widget>'
            ];

            // Create the stream
            var stream = access({
                'http://www.google.com': true,
                'tel:*': {'launch-external': 'yes'}
            });

            stream.on('data', function() { });

            stream.on('end', function() {
                var content = fs.readFileSync(path.join(tmp, 'config.xml'), 'utf8');

                // Assert the content
                content.should.be.equal(result.join(os.EOL) + os.EOL);

                cb();
            });

            // Write the file to the stream
            stream.write(new gutil.File({
                cwd: __dirname,
                base: tmp,
                path: tmp,
                stat: fs.statSync(tmp)
            }));

            stream.end();
        });
    });
});