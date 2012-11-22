Tunnelx
=============

SSH-tunnel abstraction utility

Prerequisites
-------------
**OS:** 

Unix

**SW:**

[https://github.com/alternatex/bazinga](https://github.com/alternatex/bazinga)

Installation 
-------------

**Fetch sources** [https://github.com/alternatex/tunnelx/archive/master.zip](https://github.com/alternatex/tunnelx/archive/master.zip)

**Extract to** /usr/bin/tunnelx

**Update environment variables**

```bash
TUNNELXPATH=$(cat <<'TUNNELXPATH'    

# Tunnelx
export PATH=/usr/bin/tunnelx/bin:$PATH

TUNNELXPATH
)
echo "$TUNNELXPATH" >> ~/.zshrc
```

Future releases might include
-------------
- Proper Logs
- Auto-Reconnect
- Handle Multiple Connections
- Profiles  
- Persist Settings

Usage
-------------

```bash
tunnelxjr
```

License
-------------
Released under two licenses: new BSD, and MIT. You may pick the
license that best suits your development needs.

https://github.com/alternatex/tunnelx/blob/master/LICENSE