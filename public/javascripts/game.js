document.addEventListener("DOMContentLoaded", function(event) {
  var roomId = document.getElementById('room-id')
  roomId.innerHTML = `Your Room Id is ${window.location.pathname.replace('/game/', '')}`
  var begin = document.getElementById('begin')
  begin.style.visibility = 'hidden'

  document.getElementById('begin-button').addEventListener('click', function(ev){
    ev.preventDefault()
    socket.emit('start', room)
  })
})
var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/', '')

socket.on('connect', function(){
  socket.emit('room', room)
})

socket.on('socket', function(socket){
  console.log(socket);
})

socket.on('begin', function(data){
  document.getElementById('waiting').style.visibility = 'hidden'
  var begin = document.getElementById('begin')
  begin.style.visibility = 'visible'
})
