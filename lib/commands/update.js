/**
 * Module dependencies
 */

var _ = require('underscore');
var inquirer = require('inquirer');

exports = module.exports = function(id, copy){
  var app = require('../app');
  var connection = (typeof(id)=='undefined' || typeof(app.config[id])!='object') ? { 
    "local": {
      "protocol": "http",
      "hostname": "localhost",
      "port": 8080
    },
    "remote": {
      "network": "host.tld",
      "hostname": "localhost",
      "port": 80,
      "username": "admin"
    }
  } : app.config[id];

  inquirer.prompt([
    {
      type: "input",
      message: "Enter connection name",
      name: "name",
      default: id
    },
    {
      type: "input",
      message: "Enter local hostname",
      name: "local.hostname",
      default: connection.local.hostname
    },
    {
      type: "input",
      message: "Enter local port",
      name: "local.port",
      default: connection.local.port
    },
    {
      type: "input",
      message: "Enter local protocol",
      name: "local.protocol",
      default: connection.local.protocol
    },
    {
      type: "input",
      message: "Enter remote network",
      name: "remote.network",
      default: connection.remote.network
    },
    {
      type: "input",
      message: "Enter remote hostname",
      name: "remote.hostname",
      default: connection.remote.hostname
    },
    {
      type: "input",
      message: "Enter remote port",
      name: "remote.port",
      default: connection.remote.port
    },
    {
      type: "input",
      message: "Enter remote username",
      name: "remote.username",
      default: connection.remote.username
    }

  ], function( answers ) {
    
    var name = answers['name'];
    delete answers['name'];

    var data = {};
    _(answers).each(function(answer, index){
      var segments = index.split('.');
      if(typeof(data[segments[0]])=='undefined'){
        data[segments[0]] = {};
      }
      data[segments[0]][segments[1]] = answer;
    });

    app.config[name]=data;

    if(name!=id && copy!==true) delete app.config[id];      

    app.require('store')(name);
  });
}
