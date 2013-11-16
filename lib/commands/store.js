/**
 * Module dependencies
 */

var inquirer = require('inquirer');

exports = module.exports = function(id){
  var app = require('../app');
  inquirer.prompt([{
      type: "confirm",
      message: "Do you want to bookmark this connection?",
      name: "bookmark",
      default: true
    }], function(answers){
      if(answers.bookmark===true){
        app.require('write')();
      }
      app.require('connection')(id); 
    });  
}
