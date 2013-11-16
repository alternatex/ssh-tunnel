/**
 * Module dependencies
 */

exports = module.exports = function(){  
  var app = require('../app');
  require('fs').writeFileSync(app.options.filename, JSON.stringify(app.config, null, 2), app.options.encoding);
}
