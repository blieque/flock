// global includes
var Server = require('socket.io'),
    fs = require('fs');

// local includes
var config = require('./config.js');

// initialise variables
var io;

config.use(start);

function start(configObj) {

    io = new Server(configObj.port, { path: configObj.path + '/data' });

    io.on('connection', function(socket){

        var bC = socket.broadcast.to('playing'); // shorthand

        socket.on('player ready', function(data) {

            // process data a tad
            data = cleanPositions(data);
            data.id = socket.id;
            io.to('playing').emit('player joined', data);

            // join the players' room *after* announcing arrival
            socket.join('playing');

        });

        socket.on('player introduction', function(data) {

            if (data.recipientId) {
                data.id = socket.id;
                var recipientId = data.recipientId;
                delete data.recipientId; // recipient already knows it's id
                io.to(recipientId).emit('player exists', data);
            }

        });

        socket.on('player update', function(data) {

            // disallow cheekiness
            data = cleanPositions(data);

            // add socket identifier for other clients
            data.id = socket.id;

            // send out to clients
            socket.broadcast.to('playing').emit('player update', data);

        });

        socket.on('disconnect', function() {
            socket.broadcast.to('playing').emit('player left', socket.id);
        });

    });

}

function cleanPositions(data) {

    if (data.positionX) {
        if (data.positionX < 0) data.positionX = 0;
        if (data.positionX > 1) data.positionX = 1;
    }

    if (data.positionY) {
        if (data.positionY < 0) data.positionY = 0;
        if (data.positionY > 1) data.positionY = 1;
    }

    return data;

}
