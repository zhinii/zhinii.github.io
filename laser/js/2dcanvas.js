  //assign canvas to var
                var canvas = document.getElementById('artboard');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                //create drawing elements in canvas i.e. line color, width
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = "#000000";
                ctx.lineWidth = 2;
                // var for mouse down or up
                var isMousedown = false;
                //empty var for point location
                var lastPoint = {
                    x: null,
                    y: null
                };
                //create eventlistener for mousdown and tracks the coordinates of this event
                canvas.addEventListener('mousedown', function(event) {
                    isMousedown = true;
                    lastPoint.x = event.x;
                    lastPoint.y = event.y;
                });
                //event listener for mouse up
                canvas.addEventListener('mouseup', function() {
                    isMousedown = false;
                });
                //event listener for mouse move and drawing on the move
                canvas.addEventListener('mousemove', function(event) {
                    //if mousdown is true
                    if (isMousedown) {
                        console.log(event.x, event.y);
                        //use those coordinate to draw a line
                        ctx.beginPath();
                        ctx.moveTo(lastPoint.x, lastPoint.y);
                        ctx.lineTo(event.x, event.y);
                        ctx.closePath();
                        ctx.stroke();
                        //create and place coordinate of each 'stroke'
                        lastPoint.x = event.x;
                        lastPoint.y = event.y;
                    }
                });

       var draw = document.getElementById('draw2d');
       var nav = document.getElementById('view3d');

       draw.addEventListener('click', function(){
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
       });

       nav.addEventListener('click', function(){
        canvas.style.display = 'none';
        console.log('hide');
       });

      