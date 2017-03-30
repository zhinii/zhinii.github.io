

var menuClick = document.getElementById('menu');


console.log(menuClick);

menuClick.addEventListener('click', function(){
     var images = document.querySelectorAll("#imageshow img");
      for(var i = 0; i < images.length; i++){
    if(event.target.id === 'zmotor'){  
      images[i].src = images[3].getAttribute('data-src');
      }
      else if(event.target.id === 'xmotor'){
        images[i].src = images[2].getAttribute('data-src');
      }
  }
})
