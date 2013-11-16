/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(){  
  var app = require('../app');
  var choices = [];
  choices = choices.concat(_.chain(app.config).keys().filter(function(entry){
    return entry!='lastUsedConnection';
  }).value());

  inquirer.prompt([
    {
      type      : "checkbox",
      name      : "connection",
      message   : "Select connections to export".yellow,
      paginated : true,
      choices   : choices,
    },
    {
      type: "input",
      message: "Enter export filepath",
      name: "filename",
      default: "tunnel."+(new Date().getTime())+".conf"
    }], function( answers ) {

    // TODO: clean impl!

    var exportData = {};

    answers.connection.forEach(function(connection){
      exportData[connection]=config[connection];
    });

    fs.writeFileSync(answers.filename, JSON.stringify(exportData, null, 2), 'utf8');
  }); 
}
