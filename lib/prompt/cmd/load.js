/**
 * Module dependencies
 */

exports = module.exports = function(filename){

  // merge global/instance approach for now...
  var configFile = filename || configFilename;  
  
  // ... ensure we're writing back to the same file -> yes, this is a hack 
  configFilename = filename;
  try { 
    config = JSON.parse(fs.readFileSync(configFile, 'utf8')); 
  } catch(ex){ 
    config = {}; 
  }
  return config;
};

/*
define('load', ['tunnel/config'], function(config){

function load(filename){
  
  // merge global/instance approach for now...
  var configFile = filename || configFilename;  

  // ... ensure we're writing back to the same file -> yes, this is a hack 
  configFilename = filename;
  try { 
    config = JSON.parse(fs.readFileSync(configFile, 'utf8')); 
  } catch(ex){ 
    config = {}; 
  }
  return config;
}

});
*/