/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(id){
  inquirer.prompt([{
      type: "confirm",
      message: "Do you really want to delete this connection?",
      name: "delete",
      default: true
    }], function(answers){
      var app = require('../app');
      if(answers['delete']===true){
        delete app.config[id];
        app.require('write')();
        console.log('Connection '.green + id + ' deleted'.green);
        app.require('connections')();
      } else {
        app.require('connections')();
      }
    });  
}
