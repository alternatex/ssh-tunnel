
/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var child_process = require('child_process');
var spawn = child_process.spawn;
var exec = child_process.exec;
var fs = require('fs');
var exists = fs.existsSync;
var path = require('path');
var dirname = path.dirname;
var basename = path.basename;

/**
 * Expose the root command.
 */

exports = module.exports = new Tunnel();

/**
 * Expose `Tunnel`.
 */

exports.Tunnel = Tunnel;

/**
 * Initialize a new `Tunnel`.
 *
 * @param {String} name
 * @api public
 */

function Tunnel(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
  this._args = [];
  this._name = name;
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Tunnel.prototype.__proto__ = EventEmitter.prototype;

/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *     
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function(){
 *          console.log('setup');
 *        });
 *     
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd){
 *          console.log('exec "%s"', cmd);
 *        });
 *     
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env){
 *          console.log('deploying "%s"', env);
 *        });
 *     
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc]
 * @return {Tunnel} the new command
 * @api public
 */

Tunnel.prototype.tunnel = function(name, desc){
  var args = name.split(/ +/);
  var tunnel = new Tunnel(args.shift());
  tunnel.on('disconnect', function(){
    console.log("DISCONNECTED", this);
    
    var inquirer = require("inquirer");

    var choices = Array.apply(0, new Array(26)).map(function(x,y) {
      return String.fromCharCode(y + 65);
    });

    choices.push("Multiline option \n  super cool feature");

    inquirer.prompt([
      {
        type      : "list",
        name      : "letter",
        message   : "What's your favorite letter?",
        paginated : true,
        choices   : choices
      },
      {
        type      : "checkbox",
        name      : "name",
        message   : "Select the letter contained in your name:",
        paginated : true,
        choices   : choices
      }
    ], function( answers ) {
      console.log( JSON.stringify(answers, null, "  ") );
      console.log("DISCONNECTED2", this);
    inquirer.prompt([
  {
    type: "password",
    message: "Enter your git password",
    name: "password"
  }
], function( answers ) {
  console.log("bye", answers);
});      
    });    
  });

  return tunnel;
};

Tunnel.prototype.connect = function(name, desc){
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());
  if (desc) cmd.description(desc);
  if (desc) this.executables = true;
  if (desc) this._execs[cmd._name] = true;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;
  if (desc) return this;
  return cmd;
};

Tunnel.prototype.disconnect = function(name){};

Tunnel.prototype.status = function(name){};

Tunnel.prototype.setup = function(name){};

/*
function text {
  printf "\e[1;34m"
  echo ""
  echo $1
  printf "\e[0m"
}

function bazinga_edit() {

  # internals
  BAZINGA_HOME="`dirname $1`/.." && cd $BAZINGA_HOME
  BAZINGA_INSTALL="`which bazinga 2>&1`"
  BAZINGA_INSTALL_DIR="`dirname $BAZINGA_INSTALL 2>&1`/.."

  # include core
  source $BAZINGA_INSTALL_DIR/lib/bazinga.sh

  # intialize / gather custom configuration
  bazinga_init $bazinga_namespace

  # shizzl. don't look. todo » solve overwrite data-loss » could be more sexy, right?
  bazinga_custom="${bazinga_custom}.tmp"

  # gather custom configuration
  bazinga_gather

  # replace configurations - write new configuration to disk (actually replacing conf w/ temporary one)
  bazinga_flush
}

# say hi
printf "\e[1;31m"
echo "
-------------------------------
--- ★  TUNNELX - v.1.0.1 ★  ---
-------------------------------"
printf "\e[0m"

# preset avail?
if [[ -a "../.bazinga/configure.sh" ]]
  then 
  
  # include configuration
  source ../.bazinga/configure.sh
fi

# move back to directory where we started at (TODO: properly solve path issues)
cd $currentpath

# overwrite default
export bazinga_directory=".tunnelxc"

# first execution - clean environment?
if [ ! -d $bazinga_directory ]; then  

  # create custom directory for tunnelx connection storage
  echo "Creating new tunnelx connection in directory `pwd`"
  mkdir $bazinga_directory
fi

# edit configuration?
if [ -f ".tunnelxc/settings.sh" ]; then 
  echo ""
  read -p "Configure? («Y» to edit or any key to skip)"
        ([ "$REPLY" == "y" ] || [ "$REPLY" == "Y" ])  && bazinga_edit  
else 
  # initial configuration
  bazinga_edit  
fi

# include custom configuration to feed tunnelx 
source .tunnelxc/settings.sh && rm -rf .tunnelxc/settings.sh.tmp

# shout out loud
text "listen on:"
echo "127.0.0.1"

text "port:"
echo "$tunnelx_local_port"

text "external host:"
echo "$tunnelx_remote_external_host"

text "internal host:"
echo "$tunnelx_remote_internal_host"

text "internal port:"
echo "$tunnelx_remote_internal_port"

text "identified by user:"
echo "$tunnelx_remote_external_user"

# setup ssh tunnel
printf "\e[1;34m"
echo ""
text "`ssh -N -L $tunnelx_local_port:$tunnelx_remote_internal_host:$tunnelx_remote_internal_port $tunnelx_remote_external_user@$tunnelx_remote_external_host`"
printf "\e[0m"
*/