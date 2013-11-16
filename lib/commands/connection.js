/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(id){
  var app = require('../app');
  var connection = app.config[id];
  inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to connect?",
      name: "connect",
      default: true
    }], function(answers){
      if(answers.connect===true){
        app.require('connect')(id);
      } else {
        app.require('connections')();
      }
    }); 
}
