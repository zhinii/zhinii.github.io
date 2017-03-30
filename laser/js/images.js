

var menuClick = document.getElementById('menu');


console.log(menuClick);

menuClick.addEventListener('click', function(){
    if(event.target.id === 'zmotor'){
         var images = document.querySelectorAll("#imageshow img");
         for(var i = 0; i < images.length; i++)
  {
    images[i].src = images[3].getAttribute('data-src');
  }
    }
})