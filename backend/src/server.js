const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors');
const path = require('path');


const app = express();
const server = http.Server(app);
const io = socketio(server);



mongoose.connect("mongodb+srv://iagobrayham:iagobrayham@cluster0-h2jsn.mongodb.net/semana09?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true});

const connectedUsers = [];
//usar redges banco de dados

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})



app.use(cors());//{origin;'http...'}
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


//req.query = query params - filtros
//req.params = route params - edicao ou delete


server.listen(3333);