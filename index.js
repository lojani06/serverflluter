

const express = require('express');
const path = require('path');

//integrar variables de entorno
require('dotenv').config();


const app = express();

//NODE SERVER SOCKT
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//path publico
const publicPath = path.resolve(__dirname,'public');

app.use(express.static(publicPath));




server.listen(process.env.PORT,(error)=>{

    if(error) throw new Error(error);

    console.log('servidor corriendo en el puerto ',process.env.PORT);
});