var socket = io(location.origin, { path: location.pathname + 'data' }),
    dataPrev = {},
    intervalNetwork;

function initialiseNetwork() {

    // ask to start receiving player data
    // ...and introduce ourselves
    socket.emit('player ready', {
        name: lP.name,
        colour: lP.colour,
        positionX: lP.positionX,
        positionY: lP.positionY
    });

    socket.on('player joined', function(data) {
        if (typeof data.id === 'string') {
            players[data.id] = new Player(data);
            socket.emit('player introduction', {
                recipientId: data.id,
                name: lP.name,
                colour: lP.colour,
                positionX: lP.positionX,
                positionY: lP.positionY
            });
        }
    });

    socket.on('player exists', function(data) {
        if (typeof data.id === 'string' && !players[data.id]) {
            players[data.id] = new Player(data);
        }
    });

    socket.on('player update', function(data) {
        if (typeof data.id === 'string' &&
            typeof players[data.id] !== 'undefined') {
            if (data.name) players[data.id].name = data.name;
            if (data.colour) players[data.id].colour = data.colour;
            if (data.positionX) players[data.id].positionX = data.positionX;
            if (data.positionY) players[data.id].positionY = data.positionY;
        }
    });

    socket.on('player left', function(id) {
        if (typeof id === 'string') {
            delete players[id];
        }
    });

    dataPrev.name, dataPrev.colour, dataPrev.positionX, dataPrev.positionY;

    intervalNetwork = setInterval(broadcastPosition, 1000/30); // 30 Hz

}

function broadcastPosition() {

    var data = {};

    // only send off data if it's been changed
    if (dataPrev.name !== lP.name) data.name = lP.name;
    if (dataPrev.colour !== lP.colour) data.colour = lP.colour;
    if (dataPrev.positionX !== lP.positionX) data.positionX = lP.positionX;
    if (dataPrev.positionY !== lP.positionY) data.positionY = lP.positionY;

    // if there's nothing to broadcast, don't broadcast
    if (Object.getOwnPropertyNames(data).length !== 0) {
        socket.emit('player update', data);
    }

    // create new snapshot of old data for next comparison
    dataPrev.name = lP.name;
    dataPrev.colour = lP.colour;
    dataPrev.positionX = lP.positionX;
    dataPrev.positionY = lP.positionY;

}
