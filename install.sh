#!/bin/bash

# go home
cd ~

# fetch sources
git clone https://github.com/alternatex/tunnelx.git .tunnelx

# shell configuration file (TODO: combine with $SHELL environment variable)
shellcfg="$HOME/.tunnelxrc"

# BASH
if [ -f ~/.bashrc ]; then 
	shellcfg="$HOME/.bashrc"
fi

# ZSH
if [ -f ~/.zshrc ]; then 
	shellcfg="$HOME/.zshrc"
fi

# ?
if [ -f ~/.profile ]; then 
	shellcfg="$HOME/.profile"
fi

# update shell configuration
echo "# tunnelx" >> $shellcfg
echo "export PATH=~/.tunnelx/bin:$PATH" >> ${shellcfg}

# apply 
. $shellcfg