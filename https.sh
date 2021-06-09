#!/bin/bash

#	install http-server to host browser-version
#		npm install --global http-server

#	1. Run as an one process, the public "armord-RPC-API" on "all IP's", with specified blockchain-"--data-folder", and with enabled "--CORS"
#./armord --armord-bind-address=0.0.0.0:58081 --priority-node=82.223.13.179:58080 --data-folder=ArmordBlockchainDir --CORS

#    then,
#	2. Run HTTPS->HTTP proxy, to host "armord RPC-API" over HTTPS, using key and cert in "ssl"-folder
node armord-https-rpc-proxy.js &
#	3. and then, run "http-server" to host browser-version over HTTPS, using key and cert in "ssl"-folder
http-server /mnt/d/coins/armor/armor-explorer -a 0.0.0.0 -p 443 -S --cert ssl/localhost.crt --key ssl/localhost.key
