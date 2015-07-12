var fs = require('fs');
var exports = module.exports = {};
var config;

// provide callback for app.js to access configuration
module.exports.use = function(callback) {

    // read in configuration file
    fs.readFile('config.json', 'utf8', function(errFile, data) {

        // fall-back default configuration
        config = { path: '' };

        // log error and use default configuration if filesystem error occurs
        if (errFile) {
            errorHandle(errFile);
        } else {

            var configLoad;

            // parse json file into object
            try {
                configLoad = JSON.parse(data);
            } catch(errParse) {
                errorHandle(errParse);
            }

            // make extending configuration a royal pain
            if (configLoad.path) { config.path = configLoad.path }

        }

        // execute callback
        callback(config);

    });

}

function errorHandle(err) {

    var path = '';
    if (err.path) {
        path = ' (' + err.path + ')';
    }
    console.error('Error loading configuration' + path + ':\n ' +
                  err.message);

}
