# gulp-cordova-access

[![Build Status](https://travis-ci.org/SamVerschueren/gulp-cordova-access.svg?branch=master)](https://travis-ci.org/SamVerschueren/gulp-cordova-access)
[![Coverage Status](https://coveralls.io/repos/SamVerschueren/gulp-cordova-access/badge.svg?branch=master&service=github)](https://coveralls.io/github/SamVerschueren/gulp-cordova-access?branch=master)

> Sets the access origins of the cordova project

## Installation

```
npm install --save-dev gulp-cordova-access
```
## Usage

The plugin can be used in two ways. The first way is via a key-value pair, the second way is via an object.

### Key-value pair method

The key-value pair method is used by providing one or two arguments. The first argument is the origin of the access
tag you wish to add or remove. The second argument can be either `false`, if you want to remove an access origin, or
an object to add extra properties to the `access` tag.

```javascript
const create = require('gulp-cordova-create');
const access = require('gulp-cordova-access');

gulp.task('build', () => {
    return gulp.src('build')
        .pipe(create())
        .pipe(access('*', false))
        .pipe(access('http://*.google.com'))
        .pipe(access('tel:*', {'launch-external': 'yes'}));
});
```

Because the `allow all` access tag (e.g. `*`) is the default when creating a cordova project, we first remove it. We only want the application
to be able to communicate with the google APIs.

These tags will be added to the `config.xml` file.

```xml
<access origin="http://*.google.com" />
<access origin="tel:*" launch-external="yes" />
```

### Object method

The key in the object will be used as the access origin, the value is a `boolean` indicating if you want to
add or remove the origin, or an `object` with extra parameters. The following example is identical to the
example above.

```javascript
const create = require('gulp-cordova-create');
const access = require('gulp-cordova-access');

gulp.task('build', () => {
    return gulp.src('dist')
        .pipe(create())
        .pipe(access({
            '*': false,
            'http://*.google.com': true,
            'tel:*': {
                'launch-external': 'yes'
            }
        }));
});
```

> Tip: You can add the access origins in a file called `access.json` and call the plugin with `access(require('./access.json'))`.

The second way is by providing two parameters, the first one being the name of the access origin, the second
one as the value of the access origin.

Notice that the object method is faster then the key-value pair method. The reason for this is that everytime the plugin is called,
the `config.xml` file is parsed all over again. Because you only call the plugin once with the object method, the config file
will only be parsed once.

## API

### access(origins)

#### origins

*Required*  
Type: `object`

A key-value pair object where the key is the origin and the value indicates if you want to add, remove or add extra properties to the tag.

### access(origin, value)

#### origin

*Required*  
Type: `string`

The origin of the acess tag.

##### value

*Required*  
Type: `boolean|object`

True if you want to add the tag or false if you want to remove the tag. If an object is provided, the properties will be added as extra
properties in the xml tag.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## License

MIT © Sam Verschueren
