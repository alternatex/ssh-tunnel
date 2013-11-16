/**
 * Module dependencies
 */

// filesystem
var fs = require('fs');
var exists = fs.existsSync;
var path = require('path');
var dirname = path.dirname;
var basename = path.basename;

// process
var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

// utilities
var requireDir = require('require-dir');
var _ = require('underscore'); 

/**
 * Application Core
 */

exports = module.exports = new App();

function App(options){
  var npmPackage = JSON.parse(fs.readFileSync(__dirname+'/../package.json', 'utf8'));
  
  this.commands = requireDir(__dirname+'/commands', {recurse: true});  
  this.actions = { 'back': '..', 'connect': 'Connect', 'show': 'Show', 'update': 'Update', 'copy': 'Copy', 'delete': 'Delete', 'install': 'Install', 'new': 'New connection' };
  this.version = npmPackage.version;
}

App.prototype.init = function(options){
  var defaults = {
    filename: 'tunnel.json',
    encoding: 'utf8'
  };  
  
  var config = _.extend(defaults, options);
  this.options = config;

  try { 
    this.config = JSON.parse(fs.readFileSync(__dirname+'/../'+config.filename, 'utf8')); 
  } catch(ex){ 
    this.config = {}; 
  }  
  this.tunnel = require('./index');
};


App.prototype.require = function(command){
  if(!_.isUndefined(this.commands[command])){
    return this.commands[command];
  } else {
    throw new Error('Module: ' + command  +' not found');
  }
};