'use strict';

/**
 * Sets the access origins of the cordova project.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  21 May 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Config = require('cordova-config');

// export the module
module.exports = function() {

    var project;

    return through.obj(function(file, enc, cb) {
        project = file;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        try {
            // Load the config.xml file
            var config = new Config(path.join(project.path, 'config.xml'));

            // set the access origins

            // Write the config file
            config.write(function() {
				// Call the callback
				cb();
			});
        }
        catch(err) {
			// Oh no, something happened!
            cb(new gutil.PluginError('gulp-cordova-access', err.message));
        }
    });
};
