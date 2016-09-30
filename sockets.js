module.exports = function(io){

  io.on('connection', function(socket){
    console.log('connected');

    socket.on('room', function(room){
      if(socket.room){
        socket.leave(socket.room);
      }
      socket.join(room, function(err){
        socket.handshake.accepted = false
        socket.handshake.correctAnswers = 0
      })
      if (io.sockets.adapter.rooms[room].length == 2) {
        io.sockets.adapter.rooms[room].accepted = 0
        io.sockets.adapter.rooms[room].answer = ""
        console.log(io.sockets.adapter.rooms[room]);
        io.to(room).emit('begin')
      }
    })

    socket.on('start', function(room){
      if (!socket.handshake.accepted) {
        socket.handshake.accepted = true
        io.sockets.adapter.rooms[room].accepted++
      }
      if(io.sockets.adapter.rooms[room].accepted == 2){
        io.to(room).emit('start', outputData())
      }
    })

    socket.on('keypress', function(key){

    })

    socket.on('disconnect', function(){
      console.log('disconnected');
    });

  });

  function outputData() {
    var data = {}
    var key = ['up','down','left','right']
    data.key = key[Math.floor(Math.random() * key.length)]
    return data
  }

}
