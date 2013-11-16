/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(filename){
  
  var choices = [];
  choices = choices.concat(_.chain(config).keys().filter(function(entry){
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
      message: "Enter import filepath",
      name: "import.filename"
    }], function( answers ) {

    console.log("Import: ", answers);
  }); 
}
