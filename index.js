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
module.exports = function(origin, options) {

    var project,
        origins = origin;

    if(typeof origin !== 'object') {
        // If origin is not an object, it is the origin value
        origins = {};
        origins[origin] = options;
    }

    return through.obj(function(file, enc, cb) {
        project = file;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        try {
            // Load the config.xml file
            var config = new Config(path.join(project.path, 'config.xml'));

            // Iterate over the access origins and add them to the config file
            for(var key in origins) {
                if(origins[key] === false) {
                    // If the value of the origin is false, remove it from the config file
                    config.removeAccessOrigin(key);
                }
                else {
                    // Set the access origin                  
                    config.setAccessOrigin(key, origins[key] === true ? {} : origins[key]);
                }
            }

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
