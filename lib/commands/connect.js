/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var app = require('../app');
  var connection = app.config[id];
  connection.lastConnect = Math.round(new Date().getTime() / 1000);
  app.require('write')();  
  app.tunnel.connect(connection.local.hostname, connection.local.port, connection.remote.network, connection.remote.hostname, connection.remote.port, connection.remote.username);
  setTimeout(function(){
    require('child_process').exec('open '+connection.local.protocol+'://'+connection.local.hostname+':'+connection.local.port);
  }, 5000);
}
