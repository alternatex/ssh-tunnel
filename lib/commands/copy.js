/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var app = require(__dirname + '/../app');  
  var promptStore = app.require('store');
  app.require('write')();
  var connection = app.config[id];    
  app.tunnel.connect(connection.local.hostname, connection.local.port, connection.remote.network, connection.remote.hostname, connection.remote.port, connection.remote.username);
  setTimeout(function(){
    exec('open '+connection.local.protocol+'://'+connection.local.hostname+':'+connection.local.port);
  }, 5000);
}
