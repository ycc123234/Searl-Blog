//add  npm module
const express=require('express');
const bodyParser=require('body-parser');
//add local routes
const musicRoute=require('./routes/music');

//open server
var server=express();
server.listen(8080);

//trusteeship static resources
server.use(express.static(__dirname+'/views'));
server.use(express.static(__dirname+'/assets'));
server.use(bodyParser.urlencoded({extended:false}))
//mount routers
server.use('/music',musicRoute);
