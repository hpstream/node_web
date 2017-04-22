const http =require('http');
const sServer = require('./static-server.js');
const port =3000;
const hostname ="localhost";

http.createServer((req,res) =>{
    sServer.initStaticServer(req,res);
}).listen(port,hostname,()=>{
    console.log(port+'端口已启动,正在运行中...');
});