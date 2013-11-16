/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var app = require('../../app');
  
  console.log("app".yellow, app);

  var connection = app.config[id];
  connection.lastConnect = Math.round(new Date().getTime() / 1000);
  update();  
  tunnel.connect(connection.local.hostname, connection.local.port, connection.remote.network, connection.remote.hostname, connection.remote.port, connection.remote.username);
  setTimeout(function(){
    exec('open '+connection.local.protocol+'://'+connection.local.hostname+':'+connection.local.port);
  }, 5000);
}