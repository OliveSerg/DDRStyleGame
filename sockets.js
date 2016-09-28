module.exports = function(io){
  socketRooms = []

  io.on('connection', function(socket){
    console.log('connected');
    console.log(socket.handshake)

    socket.on('room', function(room){
      if(socket.room){
        socket.leave(socket.room);
      }
      socket.join(room, function(err){
      })
      if (io.sockets.adapter.rooms[room].length = 2) {
        io.to(room).emit('begin')
      }
    })

    socket.on('keypress', function(key){
    })

    socket.on('disconnect', function(){
      console.log('disconnected');
    });

  });
}
