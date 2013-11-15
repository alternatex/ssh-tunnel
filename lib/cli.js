/**
 * Module dependencies
 */

var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;

var _ = require("underscore"); 
var fs = require("fs");
var colors = require("colors");
var inquirer = require("inquirer");

var tunnel = require(__dirname+"/index").tunnel('');

var requireDir = require('require-dir');
//var prompt = requireDir(__dirname+'/prompt', {recurse: true});

//exports.prompt = _.extend(prompt.cmd, prompt.enum);
exports.prompt = {};

tunnel.on('connect', function(){

  // TODO: display connection infos
  console.log();
  console.log("Establishing connection".green);
  console.log("Press "+"^C".yellow + " to disconnect");
});

/*
app.on('console.log', function(){
  console.log();
  console.log("Importing local certificate into remote".green);
});
*/

tunnel.on('install', function(){
  console.log();
  console.log("Importing local certificate into remote".green);
});

var actions = { 'back': '..', 'connect': 'Connect', 'show': 'Show', 'update': 'Update', 'copy': 'Copy', 'delete': 'Delete', 'install': 'Install', 'new': 'New connection' };
var configFilename = 'tunnel.json';
var config = {};

// TODO: add workflow/state-machine?!

/**
 * Expose the root command.
 */

exports = module.exports = {};

// TODO: rewrite
exports.load = function load(filename){
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

/**
 * Expose `connect`.
 */

exports.connect = connect;

function connect(id){
  var app = require('./app');
  
  console.log("app".yellow, app);

  var connection = config[id];
  connection.lastConnect = Math.round(new Date().getTime() / 1000);
  update();  
  tunnel.connect(connection.local.hostname, connection.local.port, connection.remote.network, connection.remote.hostname, connection.remote.port, connection.remote.username);
  setTimeout(function(){
    exec('open '+connection.local.protocol+'://'+connection.local.hostname+':'+connection.local.port);
  }, 5000);
}

/**
 * Expose `update`.
 */

exports.update = update;

function update(){
  fs.writeFileSync(configFilename, JSON.stringify(config, null, 2), 'utf8');
}

/**
 * Expose `prompts`.
 */

exports.prompt = {};

/**
 * Prompts
 */

exports.prompt.store = promptStore;

function promptStore(id){
  inquirer.prompt([{
      type: "confirm",
      message: "Do you want to bookmark this connection?",
      name: "bookmark",
      default: true
    }], function(answers){
      if(answers.bookmark===true){
        update();
      }
      promptConnect(id);  
    });  
}

exports.prompt.delete = promptDelete;

function promptDelete(id){
  inquirer.prompt([{
      type: "confirm",
      message: "Do you really want to delete this connection?",
      name: "delete",
      default: true
    }], function(answers){
      if(answers['delete']===true){
        delete config[id];
        update();
        console.log('Connection '.green + id + ' deleted'.green);
        promptConnectionSelect();
      } else {
        promptConnectionSelect();
      }
    });  
}

exports.prompt.connect = promptConnect;

function promptConnect(id){
  var connection = config[id];
  inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to connect?",
      name: "connect",
      default: true
    }], function(answers){
      if(answers.connect===true){
        connect(id);
      } else {
        promptConnectionSelect();
      }
    });  
}

exports.prompt.connection = promptConnectionSelect;

function promptConnectionSelect(id){
  var choiceDefault = 1;
  var choices = [];
  choices.push(actions['new'].green);
  choices = choices.concat(_.chain(config).keys().filter(function(entry){
    return entry!='lastUsedConnection';
  }).value());

  if(typeof(config.lastUsedConnection)!='undefined'){
    var lastConnect = 0;
    choices.forEach(function(choice, index){
      if(typeof(config[choice])!='undefined' && typeof(config[choice].lastConnect)!='undefined' && config[choice].lastConnect > lastConnect){
        lastConnect = config[choice].lastConnect;
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

exports.prompt.action = promptActionSelect;

function promptActionSelect(selection){
  
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
      choices   : choices,
      default   : 1
    }], function( answers ) {

    switch(answers.action){
      case actions['delete']:
        promptDelete(selection.connection);
        break;
      case actions['show']:
        var connection = config[selection.connection];
        console.log(JSON.stringify(connection, undefined, 2));
        promptActionSelect(selection);
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
      case actions['install']:
        promptInstall(selection.connection, true);
        break;
      case actions['back']:
        promptConnectionSelect();
        break;
    }

    tunnel.emit(answers.action+'_selected');
  }); 
}

exports.prompt.export = promptExportSelect;

function promptExportSelect(){
  
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
    },
    {
      type: "input",
      message: "Enter export filepath",
      name: "filename",
      default: "tunnel."+(new Date().getTime())+".conf"
    }], function( answers ) {

    // TODO: clean impl!

    var exportData = {};

    answers.connection.forEach(function(connection){
      exportData[connection]=config[connection];
    });

    fs.writeFileSync(answers.filename, JSON.stringify(exportData, null, 2), 'utf8');
  }); 
}

exports.prompt.import = promptImportSelect;

function promptImportSelect(filename){
  
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
    },
    {
      type: "input",
      message: "Enter import filepath",
      name: "import.filename"
    }], function( answers ) {

    console.log("Export: ", answers);
  }); 
}
exports.prompt.install = promptInstall;

function promptInstall(id, force){

  // TODO: set for to true if action called via menu and not through update process

  var connection = config[id];
  if(!(typeof(connection.remote.installed)=='undefined' || connection.remote.installed!==true)){
    console.log();
    console.log("Certificate already installed on remote".green)

    if(force===true){

    } else {
      console.log("connection.remote.installed".white.bold);  
      return;
    }
  }

  inquirer.prompt([{
      type: "confirm",
      message: "Do you want to install your certificate on remote?",
      name: "install",
      default: true
    }], function(answers){
      if(answers.install){
        connection.remote.installed = true;
        update();
        tunnel.install(connection.remote.network, connection.remote.username);
      }
    }); 
  return true; 
}

exports.prompt.update = promptConnection;

function promptConnection(id, copy){
var requirejs = require('requirejs');  
var loady2 = requirejs('prompt/amd');
loady2.count = (typeof(loady2.count)!='undefined' ? (loady2.count+1) : 0);
console.log("loady2", loady2);


  var connection = (typeof(id)=='undefined' || typeof(config[id])!='object') ? { 
    "local": {
      "protocol": "http",
      "hostname": "localhost",
      "port": 8080
    },
    "remote": {
      "network": "host.tld",
      "hostname": "localhost",
      "port": 80,
      "username": "admin"
    }
  } : config[id];

  inquirer.prompt([
    {
      type: "input",
      message: "Enter connection name",
      name: "name",
      default: id
    },
    {
      type: "input",
      message: "Enter local hostname",
      name: "local.hostname",
      default: connection.local.hostname
    },
    {
      type: "input",
      message: "Enter local port",
      name: "local.port",
      default: connection.local.port
    },
    {
      type: "input",
      message: "Enter local protocol",
      name: "local.protocol",
      default: connection.local.protocol
    },
    {
      type: "input",
      message: "Enter remote network",
      name: "remote.network",
      default: connection.remote.network
    },
    {
      type: "input",
      message: "Enter remote hostname",
      name: "remote.hostname",
      default: connection.remote.hostname
    },
    {
      type: "input",
      message: "Enter remote port",
      name: "remote.port",
      default: connection.remote.port
    },
    {
      type: "input",
      message: "Enter remote username",
      name: "remote.username",
      default: connection.remote.username
    }

  ], function( answers ) {
    
    var name = answers['name'];
    delete answers['name'];

    var data = {};
    _(answers).each(function(answer, index){
      var segments = index.split('.');
      if(typeof(data[segments[0]])=='undefined'){
        data[segments[0]] = {};
      }
      data[segments[0]][segments[1]] = answer;
    });

    config[name]=data;

    if(name!=id && copy!==true) delete config[id];      

    promptStore(name);
  });
}