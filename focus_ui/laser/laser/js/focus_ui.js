/**
 * Created by SAO on 6/19/2017.
 */

/*starts screen animation*/


//prevents moving z axis until animation is finished and user is on the right screen
var Z_move_enabled = false;
//total height of focus stick in mm
var stick_height = 62.74;
//depth of focus notch in mm
var notch_depth = 11.94;


//starting place of checkmark
var current_check_place = 3;
var current_check_pos = 206.47;
//width of checkmark
var test = document.getElementById("checkmark_test");
// test.style.fontSize = fontSize;
var checkmark_width = (test.clientWidth - 2);



window.onload = function() {
    document.getElementById("restart_button").addEventListener( 'click', restart_tut);
    document.getElementById("start_button").addEventListener( 'click', start_tut);
    document.getElementById("up").addEventListener( 'click', z_up);
    document.getElementById("down").addEventListener( 'click', z_down);
    document.getElementById("left").addEventListener( 'click', screen_left);
    document.getElementById("right").addEventListener( 'click', screen_right);
};

function restart_tut() {
    window.location.reload();
}

function start_tut() {

//disable start button
    document.getElementById("start_button").classList.add('hidden');
    document.getElementById("restart_button").classList.remove('hidden');
//UI ANIMATION
//FILE txt off
    document.getElementById('screen_line3').classList.add('line_off');
    document.getElementById('screen_line3').classList.remove('line_on');
    document.getElementById('text3').classList.add('text_off');
    document.getElementById('text3').classList.remove('text_on');
//XY txt on
    document.getElementById('screen_line4').classList.add('line_on');
    document.getElementById('screen_line4').classList.remove('line_off');
    document.getElementById('text4').classList.add('text_on');
    document.getElementById('text4').classList.remove('text_off');
//XY off
    setTimeout(function(){
        document.getElementById('screen_line4').classList.add('line_off');
        document.getElementById('screen_line4').classList.remove('line_on');
        document.getElementById('text4').classList.add('text_off');
        document.getElementById('text4').classList.remove('text_on');
//Z on
        document.getElementById('screen_line5').classList.add('line_on');
        document.getElementById('screen_line5').classList.remove('line_off');
        document.getElementById('text5').classList.add('text_on');
        document.getElementById('text5').classList.remove('text_off');
    },1000);

//Z blink
    setTimeout(function(){
        document.getElementById('screen_line5').classList.add('line_off');
        document.getElementById('screen_line5').classList.remove('line_on');
        document.getElementById('text5').classList.add('text_off');
        document.getElementById('text5').classList.remove('text_on');
    },1250);
    setTimeout(function(){
        document.getElementById('screen_line5').classList.add('line_on');
        document.getElementById('screen_line5').classList.remove('line_off');
        document.getElementById('text5').classList.add('text_on');
        document.getElementById('text5').classList.remove('text_off');

        //press down enter
        document.getElementById('enter').classList.add('grey_click');
        document.getElementById('enter').classList.remove('cls-7');

    },1500);
    //release enter
    setTimeout(function(){
        document.getElementById('enter').classList.add('cls-7');
        document.getElementById('enter').classList.remove('grey_click');


        //prep z edit screen, hide main menu
        document.getElementById('screen_line5').classList.add('line_off');
        document.getElementById('screen_line5').classList.remove('line_on');

        var screen1_text = document.getElementsByClassName('screen1'), i;

        for (var i = 0; i < screen1_text.length; i ++) {
            screen1_text[i].style.display = 'none';
        };

        //show z edit screen
        var screen2_text = document.getElementsByClassName('screen2'), i;

        for (var i = 0; i < screen2_text.length; i ++) {
            screen2_text[i].style.display = 'block';
        };

        //set z toggle on so that platform can be moved
        Z_move_enabled = true;

    },1750);
}



function z_up() {
    var object = scene.getObjectByName("platform");
    var z_pos_number = parseFloat(document.getElementById('z_position').textContent);
    if(Z_move_enabled && z_pos_number < 1.133) {
        if(current_check_place === 1) {
            object.translateY( 1.0 );
            z_pos_number = z_pos_number + 1.0;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 3) {
            object.translateY( 0.1 );
            z_pos_number = z_pos_number + 0.1;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 4) {
            object.translateY( 0.01 );
            z_pos_number = z_pos_number + 0.01;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 5) {
            object.translateY( 0.001 );
            z_pos_number = z_pos_number + 0.001;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
    }
}

function z_down() {
    var object = scene.getObjectByName("platform");
    var z_pos_number = parseFloat(document.getElementById('z_position').textContent);
    if(Z_move_enabled && z_pos_number > -5.000) {
        if(current_check_place === 1) {
            object.translateY( -1.0 );
            z_pos_number = z_pos_number - 1.0;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 3) {
            object.translateY( -0.1 );
            z_pos_number = z_pos_number - 0.1;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 4) {
            object.translateY( -0.01 );
            z_pos_number = z_pos_number - 0.01;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
        if(current_check_place === 5) {
            object.translateY( -0.001 );
            z_pos_number = z_pos_number - 0.001;
            document.getElementById('z_position').textContent = z_pos_number.toFixed(3);
        }
    }
}

function screen_left() {
    var object = document.getElementById('checkmark');
    if(Z_move_enabled) {
        if(current_check_place === 3) {
            current_check_pos = (current_check_pos - 2*checkmark_width);
            current_check_place = 1;
        }
        if(current_check_place > 1 && current_check_place < 6 && current_check_place !== 3) {
            current_check_pos = (current_check_pos - checkmark_width);
            current_check_place = current_check_place - 1;
        }
        object.setAttribute("transform", "translate(" + (current_check_pos) + ",77.44)");
    }
}

function screen_right() {
    var object = document.getElementById('checkmark');
    if(Z_move_enabled) {
        if(current_check_place > 2 && current_check_place < 5 && current_check_place !== 1) {
            current_check_pos = (current_check_pos + checkmark_width);
            current_check_place = current_check_place + 1;
        }
        if(current_check_place === 1) {
            current_check_pos = (current_check_pos + 2*checkmark_width);
            current_check_place = 3;
        }
        object.setAttribute("transform", "translate(" + (current_check_pos) + ",77.44)");
    }
}

function init() {
    document.addEventListener( 'click', testing, false );
}
function testing( event ) {
    /*
     event.preventDefault();
     */

}



