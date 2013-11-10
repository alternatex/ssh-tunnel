/**
 * Module dependencies
 */

exports = module.exports = function(filename){
  var choices = [];
  choices = choices.concat(_.chain(config).keys().filter(function(entry){
    return entry!='lastUsedConnection';
  }).value());

  inquirer.prompt([
    {
      type      : "checkbox",
      name      : "connection",
      message   : "Select connections to export".yellow,
      paginated : true,
      choices   : choices,
    }], function( answers ) {

    console.log("Import: ", filename, answers);
  }); 
}
