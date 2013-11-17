/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(){
  var app = require('../app');
  var choiceDefault = 1;
  var choices = [];
  choices.push(app.actions['new'].green);
  choices = choices.concat(_.chain(app.config).keys().filter(function(entry){
    return entry!='lastUsedConnection';
  }).value());

  if(typeof(app.config.lastUsedConnection)!='undefined'){
    var lastConnect = 0;
    choices.forEach(function(choice, index){
      if(typeof(app.config[choice])!='undefined' && typeof(app.config[choice].lastConnect)!='undefined' && app.config[choice].lastConnect > lastConnect){
        lastConnect = app.config[choice].lastConnect;
        choiceDefault = index;
      }
    });
  }

  inquirer.prompt([
    {
      type      : "list",
      name      : "connection",
      message   : "Select connection".yellow,
      paginated : true,
      choices   : choices,
      default   : choiceDefault
    }], function( answers ) {

    app.require('actions')(answers);
  }); 
}