var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/', '')
var start = false
var gameDiv;

document.addEventListener("DOMContentLoaded", function(event) {
  var gameDiv = document.getElementById('game')
  var roomId = document.getElementById('room-id')
  roomId.innerHTML = `Your Room Id is ${window.location.pathname.replace('/game/', '')}`

  var begin = document.getElementById('begin')
  begin.style.visibility = 'hidden'

  document.getElementById('begin-button').addEventListener('click', function(ev){
    ev.preventDefault()
    socket.emit('start', room)
  })

  document.addEventListener('onkeypress', function(){
    if (start) {

    }
  })
})

socket.on('connect', function(){
  socket.emit('room', room)
})

socket.on('begin', function(data){
  document.getElementById('waiting').style.visibility = 'hidden'
  var begin = document.getElementById('begin')
  begin.style.visibility = 'visible'
})

socket.on('start', function(data){
  start = true
  var timer = 3;
  var interval = setInterval(function(){
    gameDiv.innerHTML = `${timer}`
    if (timer == 0) {
      gameDiv.innerHTML = ""
      clearInterval(interval)
    }
    timer--
  }, 1000)
})

function displayOutput(direction){

}
