/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var app = require('app');

  var connection = config[id];
  inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to connect?",
      name: "connect",
      default: true
    }], function(answers){
      if(answers.connect){
        connect(id);
      } else {
        promptConnectionSelect();
      }
    });  
}