

var menuClick = document.getElementById('menu');


console.log(menuClick);

menuClick.addEventListener('click', function(){
     var images = document.querySelectorAll("#imageshow img");
      for(var i = 0; i < images.length; i++){
    if(event.target.id === 'zmotor'){  
      images[0].src = images[4].getAttribute('data-src');
      }
      else if(event.target.id === 'xmotor'){
        images[0].src = images[3].getAttribute('data-src');
      }
      }
})
