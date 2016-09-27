document.addEventListener("DOMContentLoaded", function(event) {
  var createRoom = document.getElementById('create-room')
  var joinRoom = document.getElementById('join-room')

  createRoom.addEventListener('click', function(event){
    function generateUID() {
      return ((Math.random()*Math.pow(36,4) << 0).toString(36))
    }
    window.location.replace(`${window.location.href + generateUID()}`)
  })

  joinRoom.addEventListener('click', function(event){

  })
});
