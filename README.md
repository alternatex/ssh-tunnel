SSH-Tunnel
=============

[![Build Status](https://secure.travis-ci.org/alternatex/ssh-tunnel.png?branch=master)](http://travis-ci.org/alternatex/ssh-tunnel)

SSH-Tunnel management utility

Installation
-------------

You can install this through [npm](https://npmjs.org):

`npm install ssh-tunnel`


Documentation
-------------

`ssh-tunnel help`

```
SSH-Tunnel
Version: 2.3.2

  Usage: ssh-tunnel [options] [command]

  Commands:

    connect <name>         Establish connection
    copy <name> <copy>     Copy existing connection
    delete <name>          Delete connection
    update <name>          Update connection
    export <file>          Export connections to file
    import <file>          Import connections from file
    install                Install your public key in a remote machine's authorized_keys
    help [cmd]             display help for [cmd]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -f, --file <file>  Load configuration from <file> (default: 'tunnel.json')
```

License
-------------
Released under two licenses: new BSD, and MIT. You may pick the
license that best suits your development needs.

https://github.com/alternatex/ssh-tunnel/blob/master/LICENSE