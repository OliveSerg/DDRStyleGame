module.exports = function(io){
  io.on('connection', function(socket){

    socket.on('room', function(room){
      socket.join(room)
    })

    socket.on('disconnect', function(){ });

  });
}
