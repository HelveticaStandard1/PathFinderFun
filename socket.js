'use strict';
module.exports = function (io) {

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
      console.log('message recieved:' + message);
      io.emit('message', {type:'new-message', text: message});
    });

    socket.on('drawing', (data) => {
      console.log('still drawing...');
      socket.broadcast.emit('drawing', data);
    });

    socket.on('clear-drawing', () => {
      console.log("clear drawing recieved");
      io.emit('clear-drawing');
    })

  });

}
