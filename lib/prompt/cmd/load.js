/**
 * Module dependencies
 */

exports = module.exports = function(filename){
  var config = null;
  try { config = JSON.parse(fs.readFileSync(filename, 'utf8')); } catch(ex){ config = {}; }
  return config;
};