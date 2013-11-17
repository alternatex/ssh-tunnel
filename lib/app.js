/**
* Module dependencies: FileSystem
*/
var fs = require('fs');
var exists = fs.existsSync;
var path = require('path');
var dirname = path.dirname;
var basename = path.basename;

/**
* Module dependencies: Process
*/
var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

/**
* Module dependencies: Utilities
*/
var requireDir = require('require-dir');
var _ = require('underscore'); 

/**
* Module definition
*/
exports = module.exports = new App();

/**
* Application Blueprint
* 
* @method constructor
* @private
* @type {Object}
* @default {Object} instance
*/
function App(){  
  this.actions = { 'back': '..', 'connect': 'Connect', 'show': 'Show', 'update': 'Update', 'copy': 'Copy', 'delete': 'Delete', 'install': 'Install', 'new': 'New connection' };
  this.commands = requireDir(__dirname+'/commands', {recurse: true});  
  false && console.log(this);
  this.pkg = JSON.parse(fs.readFileSync(__dirname+'/../package.json', 'utf8')); 
  this.version = this.pkg.version;
}

/**
* Command collection (App)
* 
* @property commands
* @type {Object}
* @default {}
*/      
App.prototype.commands = {};

/**
* Action collection (App)
* 
* @property namespace
* @type {Object}
* @default {}
*/      
App.prototype.actions = {};

/**
* Version number  
* 
* @property version
* @type {Integer}
* @default -1
*/      
App.prototype.version = -1;

/**
* Initialize application 
*
* @method init
* @param {Object} options configuration
* @return {Boolean} Returns true on success
*/
App.prototype.init = function(options){

  // set defaults
  var defaults = {
    filename: 'tunnel.json',
    encoding: 'utf8'
  };  
  
  // apply options
  var config = _.extend(defaults, options);
  this.options = config;

  // load configuration
  try { this.config = JSON.parse(fs.readFileSync(config.filename, 'utf8')); } catch(ex) { this.config = {}; }  

  // attach tunnel
  this.tunnel = require('./index');

  // listen to tunnel event: connect  
  this.tunnel.on('connect', function(){
    console.log();
    console.log("Establishing connection".green);
    console.log("Press "+"^C".yellow + " to disconnect");
    console.log();
  });

  // listen to tunnel event: install 
  this.tunnel.on('install', function(){
    console.log();
    console.log("Importing local certificate into remote".green);
    console.log();
  }); 
  
  // listen to tunnel event: selfupdate
  this.tunnel.on('selfupdate', function(){
    console.log();
    console.log("Fetching latest release from npmjs.org".green);
    console.log();
  });  

  return true;
};

/**
* Returns command if available 
*
* @method init
* @param {String} command Name of command to 
* @throws {Error} CommandNotFound
* @return {Object} Returns command object or throws an error
*/
App.prototype.require = function(command){
  if(!_.isUndefined(this.commands[command])){
    return this.commands[command];
  } else {
    throw new Error('Module: ' + command  +' not found');
  }
};
