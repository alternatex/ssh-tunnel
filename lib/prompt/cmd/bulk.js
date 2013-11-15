/**
 * Module dependencies
 */

exports = module.exports = function(id){
  
  //var app = require(__dirname+'/../../app');
  var app = require(__dirname + '/../../app');  
  console.log("app in module bulk", app);
  
  var promptStore = app.require('store');
  console.log("bulk store", promptStore, app);

  return false;

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
};