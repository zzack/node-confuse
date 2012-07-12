var fs = require('fs');
var path = require('path');

var parents = require('parents');
var figc = require('figc');
var optimist = require('optimist');

var exists = fs.existsSync || path.existsSync;

var merge = require('./node_modules/figc/node_modules/deepmerge')

module.exports = function (opts) {
    if (typeof opts === 'string') {
        opts = { env : opts };
    }
    if (!opts) opts = {};
    var prefix = opts.prefix || 'config';

    var files = opts.files ||
        [].concat(opts.env || []).map(function (e) {
            return prefix + '.' + e + '.json'
        }).concat(prefix + '.json')
    ;

    var dirs = parents(opts.dir || path.dirname(require.main.filename));
    var configFiles = []
    dirs.map(function (dir) {
            for (var i = 0; i < files.length; i++) {
                var file = path.join(dir, files[i]);
                //if the file exists push it on to the configFiles list array
                if (exists(file)) configFiles.push(file);
            }
        })
        .filter(Boolean)
    ;
    var argv = opts.argv || optimist.argv;

    if (configFiles.length === 0) return argv;

    return configFiles.reduce(function (config, file) {
        //if the file is .js assume it will export a configuration object to be merged
        if(file.split('.').pop() == 'js'){
            var obj = require(file)
            return merge(obj, config)
        }
        //else assume json and merge with figc
        return figc(file, config);
    }, argv);
};
