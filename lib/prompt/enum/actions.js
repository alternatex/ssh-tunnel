/**
 * Module dependencies
 */

exports = module.exports = function(selection){
  
  if(selection.connection==actions['new'].green){
    promptConnection();
    return true;
  } 

  var choices = [].concat(_.chain(actions).values().filter(function(action){return action!=actions['new'];}).value());

  inquirer.prompt([
    {
      type      : "list",
      name      : "action",
      message   : "Select action".yellow,
      paginated : true,
      choices   : choices
    }], function( answers ) {

    switch(answers.action){
      case actions['delete']:
        promptDelete(selection.connection);
        break;
      case actions['update']:
        promptConnection(selection.connection);
        break;
      case actions['copy']:
        promptConnection(selection.connection, true);
        break;
      case actions['connect']:
        connect(selection.connection);
        break;
    }

    tunnel.emit(answers.action+'_selected');
  }); 
}