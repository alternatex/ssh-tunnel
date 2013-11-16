/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(selection){
  var app = require('../../app');

  if(selection.connection==app.actions['new'].green){
    promptConnection();
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
      case actions['delete']:
        promptDelete(selection.connection);
        break;
      case actions['show']:
        var connection = config[selection.connection];
        console.log(JSON.stringify(connection, undefined, 2));
        promptActionSelect(selection);
        break;
      case actions['update']:
        promptConnection(selection.connection);
        break;
      case actions['copy']:
        promptConnection(selection.connection, true);
        break;
      case actions['connect']:
        connect(selection.connection);
        break;
      case actions['install']:
        promptInstall(selection.connection, true);
        break;
      case actions['back']:
        promptConnectionSelect();
        break;
    }

    tunnel.emit(answers.action+'_selected');
  }); 
}