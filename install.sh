#!/bin/bash

# go home
cd ~

# do info
printf "\e[32mchecking dependency: bazinga....\e[0m   $1\n"

# check installation
if [[ -a "$(which bazinga)" ]]
  then 
  
	# shout out lod
	printf "\e[32mbazinga found.\e[0m   $1\n"
else

	# install dependency
	shinst install "alternatex/bazinga"
fi

printf "\e[32mtunnelx is installed.\e[0m   $1\n"