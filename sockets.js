module.exports = function(io){
  var totalUsers = 0

  io.on('connection', function(socket){
    totalUsers++
    console.log(`User connected. Total Playing: ${totalUsers}`);

    socket.on('room', function(room){
      if(socket.room){
        socket.leave(socket.room);
      }
      socket.join(room, function(err){
        socket.handshake.accepted = false
        // io.sockets.adapter.rooms[room].users = io.sockets.adapter.rooms[room].users.push({correctAnswers: 0, id: socket.id}) || [{points: 0, id: socket.id}]
        if (io.sockets.adapter.rooms[room].users) {
          io.sockets.adapter.rooms[room].users.push({
            points: 0,
            id: socket.id
          })
        } else {
          io.sockets.adapter.rooms[room].users = [{
            points: 0,
            id: socket.id
          }]
        }
        if (io.sockets.adapter.rooms[room].length == 2) {
          io.sockets.adapter.rooms[room].accepted = 0
          var users = io.sockets.adapter.rooms[room].users
          console.log(users);
          io.to(room).emit('begin', users)
        }
      })
    })

    socket.on('start', function(room){
      if (!socket.handshake.accepted) {
        socket.handshake.accepted = true
        io.sockets.adapter.rooms[room].accepted++
      }
      if(io.sockets.adapter.rooms[room].accepted == 2){
        io.to(room).emit('start', direction())
      }
    })

    socket.on('correct', function(room){
       io.sockets.adapter.rooms[room].users.forEach(function(user){
        if (user.id == socket.id) {
          user.points += 100
          var data = direction()
          data.users = users
          io.to(room).emit('question', data)
        }
      })
      // var users = io.sockets.adapter.rooms[data].users
      // for(var i = 0; i < users.length; i++){
      //   if (users[i].id == socket.id){
      //     users[i].correctAnswers++
      //     if (users[i].correctAnswers == 10) {
      //       io.to(users[i].id).emit('winner')
      //       io.to(users[i+1].id).emit('loser')
      //     } else {
      //       io.to(data).emit('question', direction())
      //     }
      //   }
      // }
    })

    socket.on('disconnect', function(){
      totalUsers--
      console.log(`User disconnected. Total Playing: ${totalUsers}`);
    });

  });

  function direction() {
    var data = {}
    var key = ['up','down','left','right']
    data.key = key[Math.floor(Math.random() * key.length)]
    return data
  }
}
