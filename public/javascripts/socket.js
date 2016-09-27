var socket = io.connect('')
var room = window.location.pathname.replace('/', '')

socket.on('connect', function(){
  socket.emit('room', room)
})
