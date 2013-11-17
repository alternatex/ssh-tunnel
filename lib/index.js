/**
* Module dependencies: Core
*/
var app = require('./app');

/**
* Module dependencies: FileSystem
*/
var path = require('path');
var dirname = path.dirname;
var basename = path.basename;
var fs = require('fs');
var exists = fs.existsSync;

/**
* Module dependencies: Process
*/
var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

/**
* Module dependencies: Utilities
*/
var _ = require('underscore'); 
var colors = require('colors');

/**
* Module configuration
*/
var debug = true;

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
 * @param {Object} options
 * @api public
 */

function Tunnel(options) {

}

/**
 * Inherit from `EventEmitter.prototype`.
 */
Tunnel.prototype.__proto__ = require('events').EventEmitter.prototype;

/**
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
 * Install ssh key on remote machine (passwordless auth)
 *
 * @api public
 */  
Tunnel.prototype.selfupdate = function(){
  var cmd = 'sudo npm update -g ssh-tunnel';
  delegateExecCall(this, cmd, 'selfupdate');
};

/**
 * Load configuration from disk
 *
 * @api public
 */  

Tunnel.prototype.load = function(options){
  var options = options || {};
  return app.init(options);
};

/**
 * Miscellaneous helpers
 * 
 * TODO: clean implementation
 */

function delegateExecCall(tunnel, cmd, event){
  tunnel.emit(event);
  if(debug) console.log(cmd);  
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