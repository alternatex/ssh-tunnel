/**
 * Module dependencies
 */

exports = module.exports = function(id){
  var choiceDefault = 1;
  var choices = [];
  choices.push(actions['new'].green);
  choices = choices.concat(_.chain(config).keys().filter(function(entry){
    return entry!='lastUsedConnection';
  }).value());

  if(typeof(config.lastUsedConnection)!='undefined'){
    choices.forEach(function(choice, index){
      if(choice==config.lastUsedConnection){
        choiceDefault = index;
      }
    });
  }
  inquirer.prompt([
    {
      type      : "list",
      name      : "connection",
      message   : "Select connection".yellow,
      paginated : true,
      choices   : choices,
      default   : choiceDefault
    }], function( answers ) {

    promptActionSelect(answers);
  }); 
}