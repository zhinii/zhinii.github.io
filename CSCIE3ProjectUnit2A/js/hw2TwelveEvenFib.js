/* CSCI E-3 Introduction to Web Programming Using Javascript
 * Spring 2014
 *
 * Homework Unit #2
 *
 *
 */



 /********************************************************************
  *
  * Fourth problem: Sum of first 12 even Fibonacci numbers
  *
  ********************************************************************/
// first we get the HTML for the button
var getFibSum = document.getElementById("sumFib");

//then we set the event handler for when the button is clicked
getFibSum.onclick = function(){
               document.getElementById("sumFibResult").innerHTML = twelveEvenFibonacciSum();
 }

 /*
  *  twelveEvenFibonacciSum - calulates the sum of the first 12 even fibonacci numbers, with 0, 1 being the first two numbers of the sequence
  *
  *            @returns {integer} The sum of the first 12 even Fibonacci numbers
  */



//30 min into lecture

  var nums = 31;
  var a = 0;
  var b = 1;

// console.log(a);
// console.log(b);

if (nums <= 1){
// } else if (nums == 2){
// 	console.log(a);
// 	console.log(b);
} else {
	console.log(a);
	console.log(b);

  var counter = 0;
  while (counter < nums - 2){
  	var sum = a + b
  	if (sum % 2 == 0){
  		console.log(sum);
  	}
  	a = b;
  	b = sum;
  	counter++;

  }
  
}
	
 function twelveEvenFibonacciSum(){

 } 
