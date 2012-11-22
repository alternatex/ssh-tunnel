#!/bin/bash

# go home
cd ~

# fetch sources
git clone https://github.com/alternatex/tunnelx.git .tunnelx

# update shell configuration
if [ -f ~/.zshrc ]; then 
	echo "# tunnelx" >> ~/.zshrc
	echo "export PATH=~/.tunnelx/bin:$PATH" >> ~/.zshrc
fi

if [ -f ~/.bashrc ]; then 
	echo "# tunnelx" >> ~/.bashrc
	echo "export PATH=~/.tunnelx/bin:$PATH" >> ~/.bashrc
fi

if [ -f ~/.profile ]; then 
	echo "# tunnelx" >> ~/.profile
	echo "export PATH=~/.tunnelx/bin:$PATH" >> ~/.profile
fi