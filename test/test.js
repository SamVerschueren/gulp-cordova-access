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
});