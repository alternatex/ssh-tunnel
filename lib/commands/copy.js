/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(id){
  var app = require('../app');
  app.require('update')(id, true);
}
