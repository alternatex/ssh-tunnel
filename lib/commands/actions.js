/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(selection){
  var app = require('../app');

  if(selection.connection==app.actions['new'].green){
    app.require('new')();
    return true;
  } 

  var choices = [].concat(_.chain(app.actions).values().filter(function(action){return action!=app.actions['new'];}).value());

  inquirer.prompt([
    {
      type      : "list",
      name      : "action",
      message   : "Select action".yellow,
      paginated : true,
      choices   : choices,
      default   : 1
    }], function( answers ) {

    switch(answers.action){
      case app.actions['delete']:
        app.require('delete')(selection.connection);
        break;
      case app.actions['show']:
        var connection = app.config[selection.connection];
        console.log(JSON.stringify(connection, undefined, 2));
        app.require('actions')(selection);
        break;
      case app.actions['update']:
        app.require('update')(selection.connection);
        break;
      case app.actions['copy']:
        app.require('update')(selection.connection, true);
        break;
      case app.actions['connect']:
        app.require('connect')(selection.connection);
        break;
      case app.actions['install']:
        app.require('install')(selection.connection, true);
        break;
      case app.actions['back']:
        app.require('list')();
        break;
    }

    app.tunnel.emit(answers.action+'_selected');
  }); 
}