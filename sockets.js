module.exports = function(io){

  io.on('connection', function(socket){
    console.log('connected');
    // console.log(socket.handshake)

    socket.on('room', function(room){
      if(socket.room){
        socket.leave(socket.room);
      }
      socket.join(room, function(err){
        socket.handshake.accepted = false
      })
      if (io.sockets.adapter.rooms[room].length == 2) {
        io.sockets.adapter.rooms[room].accepted = 0
        io.to(room).emit('begin')
      }
    })

    socket.on('start', function(room){
      if (!socket.handshake.accepted) {
        socket.handshake.accepted = true
        io.sockets.adapter.rooms[room].accepted++
      }
      if(io.sockets.adapter.rooms[room].accepted == 2){
        console.log('start');
      }
    })

    socket.on('keypress', function(key){

    })

    socket.on('disconnect', function(){
      console.log('disconnected');
    });

  });
}
