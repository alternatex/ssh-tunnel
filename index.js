/**
 * Module dependencies.
 */

var path = require('path');
var dirname = path.dirname;
var basename = path.basename;

var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

var fs = require('fs');
var exists = fs.existsSync;

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
  
  var sshConnect = 'ssh -N -L '+localPort+':'+remoteHostname+':'+remotePort+' '+remoteUser+'@'+remoteNetwork;  
  console.log(sshConnect);
  this.emit('connect');
  exec(sshConnect, function(err, stdout, stderr){
    console.log(err);
    console.log(stdout);
  });
};