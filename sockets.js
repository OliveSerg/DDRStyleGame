module.exports = function(io){
  io.on('connection', function(socket){
    console.log('works')
    socket.on('disconnect', function(){ });
  });
}
