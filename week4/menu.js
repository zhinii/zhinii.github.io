

var stepList = document.getElementById('list1');

var mainMenu = document.getElementById('printhead');
var allSteps = document.getElementsByClassName('container');

window.onload = function(){
	for (var i = 0; i < allSteps.length; i ++)

			allSteps[i].style.visibility = 'hidden';
		allSteps[0].style.visibility = 'visible';
}

mainMenu.addEventListener('click', function(){
	for (var i = 0; i < allSteps.length; i ++)

			allSteps[i].style.visibility = 'hidden';
		allSteps[0].style.visibility = 'visible';
})

stepList.addEventListener('click', function(){

	allSteps[0].style.visibility = 'hidden';

	if (event.target.id === 'sp1'){
		allSteps[1].style.visibility = 'visible';
	}
	else {
		allSteps[1].style.visibility = 'hidden';
	}

if (event.target.id === 'sp2'){
		allSteps[2].style.visibility = 'visible';
	}
	else {
		allSteps[2].style.visibility = 'hidden';
	}

if (event.target.id === 'sp3'){
			allSteps[3].style.visibility = 'visible';
	}
	else {
		allSteps[3].style.visibility = 'hidden';
	}

	if (event.target.id === 'sp4'){
			
		allSteps[4].style.visibility = 'visible';
	}
	else {
		allSteps[4].style.visibility = 'hidden';
	}
	if (event.target.id === 'sp5'){
			
		allSteps[5].style.visibility = 'visible';
	}
	else {
		allSteps[5].style.visibility = 'hidden';
	}
	if (event.target.id === 'sp6'){
			
		allSteps[6].style.visibility = 'visible';
	}
	else {
		allSteps[6].style.visibility = 'hidden';
	}

	if (event.target.id === 'sp7'){
			
		allSteps[7].style.visibility = 'visible';
	}
	else {
		allSteps[7].style.visibility = 'hidden';
	}
	if (event.target.id === 'sp8'){
			
		allSteps[8].style.visibility = 'visible';
	}
	else {
		allSteps[8].style.visibility = 'hidden';
	}

})