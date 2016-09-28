document.addEventListener("DOMContentLoaded", function(event) {
  var roomId = document.getElementById('room-id')
  roomId.innerHTML = `Your Room Id is ${window.location.pathname.replace('/', '')}`
})
