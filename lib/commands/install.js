/**
 * Module dependencies
 */

var inquirer = require('inquirer');

exports = module.exports = function(id, force){

  // TODO: set for to true if action called via menu and not through update process
  var app = require('../app');
  var connection = app.config[id];
  if(!(typeof(connection.remote.installed)=='undefined' || connection.remote.installed!==true)){
    console.log();
    console.log("Certificate already installed on remote".info)

    if(force!==true){
      console.log("TODO: implement. [connection.remote.installed]".warn);  
      return;
    }
  }

  inquirer.prompt([{
      type: "confirm",
      message: "Do you want to install your public key in the remote machine's authorized_keys?",
      name: "install",
      default: true
    }], function(answers){
      if(answers.install){
        connection.remote.installed = true;
        app.require('write')();
        app.tunnel.install(connection.remote.network, connection.remote.username);
      }
    }); 
  return true; 
}
