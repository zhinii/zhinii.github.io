

var stepList = document.getElementById('list1');
var fanList = document.getElementById('list2');
var mainMenu = document.getElementById('printhead');
var allSteps = document.getElementsByClassName('container');
var fanMenu = document.getElementById('fan');

window.onload = function(){
	
	for (var i = 0; i < allSteps.length; i ++)

			allSteps[i].style.visibility = 'hidden';
		allSteps[0].style.visibility = 'visible';
stepList.style.visibility ='hidden';
	fanList.style.visibility = 'hidden';

		
}

fanMenu.addEventListener('click', function(){
			stepList.style.visibility ='hidden';
			fanList.style.visibility = 'visible';
			for (var i = 0; i < allSteps.length; i ++)

			allSteps[i].style.visibility = 'hidden';
		allSteps[0].style.visibility = 'visible';
});

mainMenu.addEventListener('click', function(){
			stepList.style.visibility ='visible';
					fanList.style.visibility = 'hidden';


	for (var i = 0; i < allSteps.length; i ++)

			allSteps[i].style.visibility = 'hidden';
		allSteps[0].style.visibility = 'visible';
});

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


fanList.addEventListener('click', function(){

	allSteps[0].style.visibility = 'hidden';

	if (event.target.id === 'sf1'){
		allSteps[9].style.visibility = 'visible';
	}
	else {
		allSteps[9].style.visibility = 'hidden';
	}

if (event.target.id === 'sf2'){
		allSteps[10].style.visibility = 'visible';
	}
	else {
		allSteps[10].style.visibility = 'hidden';
	}

if (event.target.id === 'sf3'){
			allSteps[11].style.visibility = 'visible';
	}
	else {
		allSteps[11].style.visibility = 'hidden';
	}

	if (event.target.id === 'sf4'){
			
		allSteps[12].style.visibility = 'visible';
	}
	else {
		allSteps[12].style.visibility = 'hidden';
	}
	if (event.target.id === 'sf5'){
			
		allSteps[13].style.visibility = 'visible';
	}
	else {
		allSteps[13].style.visibility = 'hidden';
	}
	if (event.target.id === 'sf6'){
			
		allSteps[14].style.visibility = 'visible';
	}
	else {
		allSteps[14].style.visibility = 'hidden';
	}
	if (event.target.id === 'sf7'){
			
		allSteps[15].style.visibility = 'visible';
	}
	else {
		allSteps[15].style.visibility = 'hidden';
	}

})