// Grab the photo element
var photo = document.getElementById('photo');

// Grab the event listener
var button = document.getElementById('button');

button.addEventListener('click', function(){ // When we click the button
  // Toggle `hidden` as a class for the photo, enabling (or disabling) the `display: none` rule
  photo.classList.toggle('hidden');
});