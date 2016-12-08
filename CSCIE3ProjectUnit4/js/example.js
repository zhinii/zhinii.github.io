/* This page is modified from Larry's Unit 4 transcript.js file */

// jQuery plugin
(function($){ // $ is the jQuery Object
    $.fn.playerConnect = function(player){
        var transcriptElements = this;
        console.log(transcriptElements);

        player.onTime(function(evt){
            var time =  '';     //YOUR CODE TO ADD #2
            console.log(time);  // see if it's working

            // YOUR for() loop or transcriptElements.each() goes here...
            // YOUR CODE TO ADD #3
            transcriptElements.each( function() {;
                console.log($(this));
                console.log('data-start = ' + $(this).attr('data-start'));
                console.log('data-dur = '   + $(this).attr('data-dur'));
            });
        });

        return this.click(function(evt){
            // YOUR CODE TO ADD #4
            //   Get the value of the data-start attribute (the jQuery .attr() function could help here)
            //   and call player.seek([your value goes here])
            console.log($(this));
            var data-start = $(this).attr('data-start');
            player.seek(data-start);
       });
   };
})(jQuery); // self-invoking function which passes the jQuery Object as the $ param

$(document).ready(function(){
   //  YOUR CODE TO ADD #1 (already done for you)
   var player = jwplayer("playerDiv").setup({
                    file: "http://www.people.fas.harvard.edu/~lbouthillier/nasa-spinoffs.mp4",
                    height: 360,
                    width: 640,
                    controls:true,
                });

   // Use player.onReady to be sure the player is loaded before we try to do anything with it
   player.onReady(function(){
        //  Here we call our jQuery plugin, playerConnect, which expects the
        //  collection of HTML elements that contains the transcript. In this
        //  case it's all the SPANs with class="words"
        $('.words').playerConnect(player);
    });
});