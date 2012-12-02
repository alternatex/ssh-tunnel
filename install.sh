#!/bin/bash

# go home
cd ~

# fetch sources
git clone https://github.com/alternatex/tunnelx.git .tunnelx

# shell configuration file (TODO: combine with $SHELL environment variable)
shellcfg="~/.tunnelxrc"

# ZSH
if [ -f ~/.zshrc ]; then 
	shellcfg="~/.zshrc"
fi

# BASH
if [ -f ~/.bashrc ]; then 
	shellcfg="~/.bashrc"
fi

# ?
if [ -f ~/.profile ]; then 
	shellcfg="~/.profile"
fi

# update shell configuration
echo "# tunnelx" >> $shellcfg
echo "export PATH=~/.tunnelx/bin:$PATH" >> $shellcfg

# apply 
. $shellcfg