var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/game/', '')
var start = false
var gameDiv, answer;

document.addEventListener("DOMContentLoaded", function(event) {
  var gameDiv = document.getElementById('game')
  var roomId = document.getElementById('room-id')
  roomId.innerHTML = `Your Room Id is ${room}`

  var begin = document.getElementById('begin')
  begin.style.visibility = 'hidden'

  document.getElementById('begin-button').addEventListener('click', function(ev){
    ev.preventDefault()
    socket.emit('start', room)
  })

  document.addEventListener('keydown', function(ev){
    if (start) {

    }
  }, false)

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
        displayOutput(data.key)
        clearInterval(interval)
      }
      timer--
    }, 1000)
  })

  function displayOutput(direction){
    gameDiv.innerHTML = ""
    gameDiv.innerHTML = direction
    answer = direction
  }
})
