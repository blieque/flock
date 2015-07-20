var fs = require('fs');
var config;

// provide callback for app.js to access configuration
module.exports.use = function(callback) {

    // read in configuration file
    fs.readFile('config.json', 'utf8', function(fileErr, data) {

        // fall-back default configuration
        config = { path: '',
                   port: 3000 };

        // log error and use default configuration if filesystem error occurs
        if (fileErr) {
            errorHandle(fileErr);
        } else {

            var configLoad;

            // parse json file into object
            try {
                configLoad = JSON.parse(data);
            } catch(errParse) {
                errorHandle(errParse);
            }

            // make extending configuration a royal pain
            if (configLoad.path) config.path = configLoad.path;
            if (configLoad.port) config.port = configLoad.port;

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
