var socket = io.connect('http://localhost:3000')
var room = window.location.pathname.replace('/game/', '')
var start = false
var answer, response;
var gameTimer = 30

document.addEventListener("DOMContentLoaded", function(event) {
  var gameDiv = document.getElementById('game')
  var directionOutput = document.getElementById('direction')
  var initialClasses = directionOutput.className
  var upArrow = document.getElementById('up').firstChild
  var downArrow = document.getElementById('down').firstChild
  var leftArrow = document.getElementById('left').firstChild
  var rightArrow = document.getElementById('right').firstChild
  var score = document.getElementById('score')
  var $gameTimer = document.getElementById('timer')
  var roomId = document.getElementById('room-id')
  var begin = document.getElementById('begin-button')

  roomId.innerHTML = `Your Room Id is ${room}`
  begin.style.visibility = 'hidden'
  gameDiv.style.visibility = 'hidden'

  document.getElementById('begin-button').addEventListener('click', function(ev){
    ev.preventDefault()
    socket.emit('start', room)
    begin.style.visibility = 'hidden'
  })

  document.addEventListener('keydown', function(ev){
    ev.preventDefault()
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

  socket.on('begin', function(users){
    document.getElementById('waiting').style.visibility = 'hidden'
    displayScore(users)
    begin.style.visibility = 'visible'
  })

  socket.on('start', function(data){
    var startTimer = 3;
    var startInterval = setInterval(function(){
      $gameTimer.innerHTML = `${startTimer}`
      if (startTimer == 0) {
        start = true
        startGameTimer()
        gameDiv.style.visibility = 'visible'
        displayDirection(data.key)
        clearInterval(startInterval)
      }
      startTimer--
    }, 1000)
  })

  socket.on('question', function(data){
    if (socket.id == data.sender) {
      displayDirection(data.key)
    }
    updateScore(data.users)
  })

  socket.on('results', function(data){
    if(data.id.replace('/#',"") == socket.id){
      winner()
    }else {
      loser()
    }
  })

  function displayDirection(direction){
    upArrow.className = ""
    downArrow.className = ""
    leftArrow.className = ""
    rightArrow.className = ""
    switch (direction) {
      case 'up':
        upArrow.className = "animate"
        break;
      case 'down':
        downArrow.className = "animate"
        break;
      case 'left':
        leftArrow.className = "animate"
        break;
      case 'right':
        rightArrow.className = "animate"
        break;
      default:
    }
    directionOutput.innerHTML = direction.toUpperCase()
    directionOutput.classList.add(`grow`)
    answer = direction
  }

  function displayScore(usersArray){
    usersArray.forEach(function(user){
      var userItem = document.createElement('p')
      userItem.id = user.id
      var userText = document.createTextNode(
        `${user.id.replace('/#',"")}: ${user.points}`
      )
      userItem.appendChild(userText)
      score.appendChild(userItem)
    })
  }
  function updateScore(usersArray){
    usersArray.forEach(function(user){
      var userItem = document.getElementById(user.id)
      userItem.innerHTML = `${user.id.replace('/#',"")}: ${user.points}`
    })
  }

  function startGameTimer(){
    var gameInterval;
    gameInterval = setInterval(function(){
      $gameTimer.innerHTML = `${gameTimer}`
      if (gameTimer < 6) {
        $gameTimer.classList.add('growTimer')
      }
      if (gameTimer === 0) {
        start = false
        $gameTimer.classList.remove('growTimer')
        socket.emit('end', room)
        clearInterval(gameInterval)
      }
      gameTimer--
    }, 1000)
  }

  function winner(){
    console.log('winner')
  }

  function loser(){
    console.log('loser')
  }
})
