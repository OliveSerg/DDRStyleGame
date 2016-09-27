document.addEventListener("DOMContentLoaded", function(event) {
  var createRoom = document.getElementById('create-room')
  var joinButton = document.getElementById('join-button')
  var joinRoom = document.getElementById('join-room')
  joinRoom.style.visibility = 'hidden'

  createRoom.addEventListener('click', function(event){
    function generateUID() {
      return ((Math.random()*Math.pow(36,4) << 0).toString(36))
    }
    window.location.replace(`${window.location.href + generateUID()}`)
  })

  joinButton.addEventListener('click', function(event){
    joinRoom.style.visibility = 'visible'
  })
});
