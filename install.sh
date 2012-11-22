#!/bin/bash

# go home
cd ~

# fetch sources
git clone https://github.com/alternatex/tunnelx.git && cd tunnelx

# update shell configuration
echo "# tunnelx" >> ~/.zshrc
echo "export PATH=~/tunnelx/bin:$PATH" >> ~/.zshrc