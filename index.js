var fs = require('fs');
var path = require('path');

var parents = require('parents');
var figc = require('figc');
var optimist = require('optimist');

var exists = fs.existsSync || path.existsSync;

module.exports = function (opts) {
    if (typeof opts === 'string') {
        opts = { env : opts };
    }
    if (!opts) opts = {};
    var prefix = opts.prefix || 'config';
    
    var files = opts.files ||
        (opts.env || []).map(function (e) {
            return prefix + '.' + e + '.json'
        }).concat(prefix + '.json')
    ;
    
    var dirs = parents(opts.dir || path.dirname(require.main.filename));
    var configFiles = dirs
        .map(function (dir) {
            for (var i = 0; i < files.length; i++) {
                var file = path.join(dir, files[i]);
                if (exists(file)) return file;
            }
        })
        .filter(Boolean)
    ;
    var argv = opts.argv || optimist.argv;
    if (configFiles.length === 0) return argv;
    
    return configFiles.reduce(function (config, file) {
        return figc(file, config);
    }, argv);
};
