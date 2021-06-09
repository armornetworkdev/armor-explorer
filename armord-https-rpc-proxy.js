// npm install --save fs
// npm install --save http
// npm install --save node-http-proxy

var fs = require('fs');
var http = require('http');
var httpProxy = require('http-proxy');

//
// Create a proxy server with latency
//
var proxy = httpProxy.createProxyServer();

//
// Create the HTTPS proxy server in front of a HTTP server
//

var Armord_HTTP_RPC_IP = '127.0.0.1';
var Armord_HTTP_RPC_Port = 58081;

var HTTPS_Proxy_IP = '127.0.0.1';
var HTTPS_Proxy_Port = 58082;

//show this
console.log("(HTTPS -> HTTP): "+HTTPS_Proxy_IP+":"+HTTPS_Proxy_Port+" -> "+Armord_HTTP_RPC_IP+":"+Armord_HTTP_RPC_Port);

//run proxy
httpProxy.createServer({
  target: {
    host: Armord_HTTP_RPC_IP,
    port: Armord_HTTP_RPC_Port
  },
  ssl: {
    key: fs.readFileSync('ssl/localhost.key', 'utf8'),	//KEY
    cert: fs.readFileSync('ssl/localhost.crt', 'utf8')	//CERT
  }
}).listen(HTTPS_Proxy_Port);	//HTTPS-port
