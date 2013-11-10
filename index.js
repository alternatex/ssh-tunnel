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

var fs = require('fs');
var exists = fs.existsSync;

// package.json
var npmPackage = JSON.parse(fs.readFileSync(__dirname+'/package.json', 'utf8'));
var version = npmPackage.version;

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
  console.log(cmd);
  this.emit('connect');
  exec(cmd, function(err, stdout, stderr){
    console.log(err);
    console.log(stdout);
  });
};

/**
 * Install ssh key on remote machine (passwordless auth)
 *
 * @api public
 */      
Tunnel.prototype.install = function(remoteNetwork, remoteUser){
  
  var cmd = 'ssh-copy-id '+remoteUser+'@'+remoteNetwork;  
  console.log(cmd);
  this.emit('connect');
  exec(cmd, function(err, stdout, stderr){
    console.log(err);
    console.log(stdout);
  });
};