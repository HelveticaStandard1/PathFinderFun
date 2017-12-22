'use strict';
module.exports = function (io) {

    var whiteBoardDao = require('../db/dao/whiteBoardDao');

    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('add-message', (message) => {
            console.log('message recieved:' + message);
            io.emit('message', {type: 'new-message', text: message});
        });

        socket.on('drawing', (data) => {
            whiteBoardDao.updatePrimaryBoard(data);
            socket.broadcast.emit('drawing', data);
        });

        socket.on('clear-drawing', () => {
            io.emit('clear-drawing');
        });

        socket.on('get-drawing', () => {
            var gameBoard = whiteBoardDao.getPrimaryBoard();
            gameBoard.then((gameBoard) => {
                io.emit('current-drawing', gameBoard);
            }).catch((error) => {
                io.emit('current-drawing', error);
            })
        });

    });

}
