document.addEventListener("DOMContentLoaded", function(event) {
  var createRoom = document.getElementById('create-room')
  var joinButton = document.getElementById('join-button')
  var joinRoom = document.getElementById('join-room')
  joinRoom.style.visibility = 'hidden'

  createRoom.addEventListener('click', function(event){
    function generateUID() {
      return ((Math.random()*Math.pow(36,4) << 0).toString(36))
    }
    window.location.replace(`${window.location.href}game/${generateUID()}`)
  })

  joinButton.addEventListener('click', function(event){
    if(joinRoom.style.visibility == 'visible'){
      joinRoom.style.visibility = 'hidden'
    } else {
      joinRoom.style.visibility = 'visible'
    }
  })

  document.getElementById('join').addEventListener('click', function(event){
    event.preventDefault()
    var roomId = document.getElementById('room-id').value
    if(roomId == ''){
      alert('Not a value')
    } else {
      window.location.replace(`${window.location.href}game/${roomId}`)
    }
  })

});
