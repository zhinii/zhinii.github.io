/* hw3a.js  */

// your solution here
console.log('test');

function divideTranscript(){

//get document
	var el = document.getElementById('transcriptText');


//split text in div to an array
for( var i = 0; i < el.children.length; i++){
	var text = el.children[i];
	var words = text.childNodes[0].nodeValue;
	var arr = words.split(' ');
	

	//clear div
	el.innerHTML = '';

	}
		//put each word into span	

for (var j = 0; j < arr.length; j++){
		var newSpan = document.createElement('SPAN');
		var newText = document.createTextNode(arr[j] + ' ');
		newSpan.appendChild(newText);

//append span to div
el.appendChild(newSpan).innerHTML;
console.log(newSpan);
	}

el.addEventListener('mouseover', function(){
				this.style.fontWeight = '900';
		})



}