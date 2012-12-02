#!/usr/bin/env bash
bazinga_namespace="tunnelx_"
bazinga_directory=".tunnelxc"
bazinga_custom=".tunnelxc/settings.sh"

function bazinga_gather(){
	bazinga_input "local_port" "local_port"
	bazinga_input "remote_external_user" "remote_external_user"
	bazinga_input "remote_external_host" "remote_external_host"
	bazinga_input "remote_internal_host" "remote_internal_host"
	bazinga_input "remote_internal_port" "remote_internal_port"
}