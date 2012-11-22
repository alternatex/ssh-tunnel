#!/bin/bash

function text {
	printf "\e[1;34m"
	echo ""
	echo $1
	printf "\e[0m"
}

printf "\e[1;31m"
echo "
------------------
 ★  TUNNELX-JR ★
------------------"
printf "\e[0m"

text "listen on:"
echo "127.0.0.1"

text "port:"
read local_port

text "external host:"
read remote_external_host

text "internal host:"
read remote_internal_host

text "internal port:"
read remote_internal_port

text "identified by user:"
read remote_user

printf "\e[1;34m"
echo ""
text "`ssh -N -L $local_port:$remote_internal_host:$remote_internal_port $remote_user@$remote_external_host`"
printf "\e[0m"
