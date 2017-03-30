

var menuClick = document.getElementById('menu');


console.log(menuClick);

menuClick.addEventListener('click', function(){
     var images = document.querySelectorAll("#imageshow img");
    
    if(event.target.id === 'zmotor'){  
      images = images[3].getAttribute('data-src');
      }
      else if(event.target.id === 'xmotor'){
        images = images[2].getAttribute('data-src');
      }

})
