/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var connection = config[id];
  config.lastUsedConnection = id;
  update();  
  tunnel.connect(connection.local.hostname, connection.local.port, connection.remote.network, connection.remote.hostname, connection.remote.port, connection.remote.username);
  setTimeout(function(){
    exec('open '+connection.local.protocol+'://'+connection.local.hostname+':'+connection.local.port);
  }, 5000);
}