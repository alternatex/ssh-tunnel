/**
 * Module dependencies.
 */

var path = require('path');
var dirname = path.dirname;
var basename = path.basename;

var colors = require('colors');

var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

var _ = require('underscore'); 

var fs = require('fs');
var exists = fs.existsSync;

// package.json
var npmPackage = JSON.parse(fs.readFileSync(__dirname+'/../package.json', 'utf8'));
var version = npmPackage.version;
var debug = false;

// TODO: turn lib/cli.js into lib/tunnel.js err lib/index.js -> no-index; package.json/main:lib/index.js

/**
 * Expose the root command.
 */

exports = module.exports = new Tunnel();

/**
 * Expose `Tunnel`.
 */

exports.Tunnel = Tunnel;

/**
 * Initialize a new `Tunnel`.
 *
 * @param {String} name
 * @api public
 */

function Tunnel(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
  this._args = [];
  this._name = name;
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Tunnel.prototype.__proto__ = require('events').EventEmitter.prototype;

/**
 * Add command `tunnel`.
 *
 * @param {String} name
 * @param {String} [desc]
 * @return {Tunnel} the new command
 * @api public
 */

Tunnel.prototype.tunnel = function(name, desc){
  var args = name.split(/ +/);
  var tunnel = new Tunnel(args.shift());
  tunnel.version = version;

  tunnel.on('connect', function(){});    
  tunnel.on('disconnect', function(){});    
  tunnel.on('status', function(){});    

  return tunnel;
};

/**
 * ...
 *
 * @api public
 */      
Tunnel.prototype.connect = function(localHostname, localPort, remoteNetwork, remoteHostname, remotePort, remoteUser){
  var cmd = 'ssh -N -L '+localPort+':'+remoteHostname+':'+remotePort+' '+remoteUser+'@'+remoteNetwork;  
  delegateExecCall(this, cmd, 'connect');  
};

/**
 * Install ssh key on remote machine (passwordless auth)
 *
 * @api public
 */  

Tunnel.prototype.install = function(remoteNetwork, remoteUser){
  var cmd = 'ssh-copy-id '+remoteUser+'@'+remoteNetwork;
  delegateExecCall(this, cmd, 'install');
};

/**
 * Miscellaneous helpers
 * 
 * TODO: clean implementation
 */

function delegateExecCall(tunnel, cmd, event){
  if(debug) console.log(cmd);
  tunnel.emit(event);
  exec(cmd, function(err, stdout, stderr){
    logExecCall(err, stdout, stderr);
  });
}

function logExecCall(err, stdout, stderr){  
  if(typeof(stderr)!='undefined' && stderr!=null) { 
    console.log();
    console.log(stderr.red); 
  }
  if(typeof(err)!='undefined' && err!=null) {
    console.log(JSON.stringify(err, undefined, 2));
  }
  if(typeof(stdout)!='undefined') { 
    console.log(stdout.cyan.bold);  
  }
}