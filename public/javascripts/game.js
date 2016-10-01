var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/game/', '')
var start = false
var gameDiv, answer, response;
var gameTimer = 30

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
    switch (ev.keyCode) {
      case 40:
      case 83:
        response = 'down'
        break;
      case 38:
      case 87:
        response = 'up'
        break;
      case 37:
      case 65:
        response = 'left'
        break;
      case 39:
      case 68:
        response = 'right'
        break;
      default:
    }
    if (start) {
      if (response == answer) {
        socket.emit('correct', room)
      } else {
        console.log('NOPE');
      }
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
    var startTimer = 3;
    var startInterval = setInterval(function(){
      gameDiv.innerHTML = `${startTimer}`
      if (startTimer == 0) {
        start = true
        begin.style.visibility = 'hidden'
        displayDirection(data.key)
        clearInterval(startInterval)
        startGameTimer()
      }
      startTimer--
    }, 1000)
  })

  socket.on('question', function(data){
    displayDirection(data.key)
    // displayScore(data.score)
  })

  socket.on('winner', function(data){
    console.log('you win')
  })

  socket.on('loser', function(data){
    console.log('you lose')
  })

  function displayDirection(direction){
    gameDiv.innerHTML = ""
    gameDiv.innerHTML = direction
    answer = direction
  }

  function displayScore(score){

  }

  function startGameTimer(){
    var gameInterval;
    gameInterval = setInterval(function(){
      roomId.innerHTML = `${gameTimer}`
      if (gameTimer == 0) {
        start = false
        clearInterval(gameInterval)
      }
      gameTimer--
    }, 1000)
  }
})
