'use strict';

/**
 * Sets the access origins of the cordova project.
 *
 * @author Sam Verschueren	  <sam.verschueren@gmail.com>
 * @since  21 May 2015
 */

// module dependencies
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var Config = require('cordova-config');

// export the module
module.exports = function (origin, options) {
	var project;
	var origins = origin;

	if (typeof origin !== 'object') {
		// If origin is not an object, it is the origin value
		origins = {};
		origins[origin] = options;
	}

	return through.obj(function (file, enc, cb) {
		project = file;

		this.push(file);

		try {
			var config = new Config(path.join(project.path, 'config.xml'));

			Object.keys(origins).forEach(function (origin) {
				if (origins[origin] === false) {
					config.removeAccessOrigin(origin);
				} else {
					config.setAccessOrigin(origin, origins[origin] === true ? {} : origins[origin]);
				}
			});

			config.write(function () {
				cb();
			});
		} catch (err) {
			cb(new gutil.PluginError('gulp-cordova-access', err.message));
		}
	});
};
