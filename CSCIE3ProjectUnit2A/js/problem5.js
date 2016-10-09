
var myTextareaElement =  document.getElementById('myWordsToCount');

myTextareaElement.onkeyup = function(){

    // your code goes here
var char = document.getElementById('myWordsToCount').value;
var lgth = char.length; 

     document.getElementById("wordcount").innerHTML = lgth;
}