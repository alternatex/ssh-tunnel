/**
 * Module dependencies
 */

exports = module.exports = function(){
  fs.writeFileSync(configFilename, JSON.stringify(config, null, 2), 'utf8');
}
