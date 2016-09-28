var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/', '')

socket.on('connect', function(){
  socket.emit('room', room)
})

socket.on('socket', function(socket){
  console.log(socket);
})
