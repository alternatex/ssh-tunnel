
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

// TODO: add annotations to create the whole menu, actions and the reference between object, properties, flatten -> properties: remoteHostname, remotePort, localHostname, ....

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
 * Add command `name`.
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

  // api
  return {
    connect: function(){},
    disconnect: function(){},
    status: function(){},
  };
};

/**
 * Context `Local`
 *
 * @cli:type {Inquirer.prompt.type} "input"
 * @cli:message {String} "Enter local hostname"
 * @cli:name {String} "local.hostname",
 * @cli:default {String} connection.local.hostname
*/
Tunnel.prototype.local = {
  hostname: 'hostname',
  port: 8080
};

/**
 * Context `Remote`
 *
 * @cli:type {Inquirer.prompt.type} "input"
 * @cli:message {String} "Enter local hostname"
 * @cli:name {String} "local.hostname",
 * @cli:default {String} connection.local.hostname
*/
Tunnel.prototype.remote = {
  network: 'hostname',
  hostname: 'hostname',
  port: 8080,
  username: ''
};

/**
 * Add command `name`.
 *
 * @cli:type {Inquirer.prompt.type} "input"
 * @cli:message {String} "Enter local hostname"
 * @cli:name {String} "local.hostname",
 * @cli:default {String} connection.local.hostname
*/
Tunnel.prototype.localPort = '';

/**
 * Add command `name`.
 *
 * @param {String} name
 * @param {String} [desc]
 * @return {Tunnel} the new command
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
  /*
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());
  if (desc) cmd.description(desc);
  if (desc) this.executables = true;
  if (desc) this._execs[cmd._name] = true;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;
  if (desc) return this;
  return cmd;*/
};

Tunnel.prototype.disconnect = function(name){
  this.emit('disconnect');
};