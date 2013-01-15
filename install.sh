#!/bin/bash

# go home
cd ~

# do info
echo "checking dependency: bazinga...."

# do check 
if command -v "bazinga" &>/dev/null
then

	# shout out lod
	echo "bazinga found. good."
else

	# install dependency
	shinst install "alternatex/bazinga" -n "bazinga"
fi