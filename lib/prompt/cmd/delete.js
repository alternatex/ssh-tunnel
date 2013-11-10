/**
 * Module dependencies
 */

exports = module.exports = function(id){
  inquirer.prompt([{
      type: "confirm",
      message: "Do you really want to delete this connection?",
      name: "delete",
      default: true
    }], function(answers){
      if(answers['delete']){
        delete config[id];
        update();
        console.log('Connection '.green + id + ' deleted'.green);
        promptConnectionSelect();
      } else {
        promptConnectionSelect();
      }
    });  
}