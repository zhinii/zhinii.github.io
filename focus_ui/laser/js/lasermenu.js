var accord = document.getElementsByClassName("accordion");
var i;
var panelist = document.getElementsByTagName('div');

console.log(panelist);

for (i = 0; i < accord.length; i++) {
    accord[i].onclick = function(){ ////onlick of accord item execute function
        
for (var j = 0; j < panelist.length; j++){
    
        if(panelist[j].matches(".panel")){ ///if div class matches .panel
            panelist[j].style.display = 'none';  ///do not display it
        }   
}
        var panel = this.nextElementSibling;    
            panel.style.display = "block"  /// display the nextelementsibling of accord item clicked
    }
}