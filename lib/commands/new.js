/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var app = require('../app');
  var connection = app.config[id];
  app.require('update')();
}
