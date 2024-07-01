<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>2D Platformer</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.5);
        }
        #background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        #gameCanvas {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        #startScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    .start-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }
    #startButton {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
    }
     html, body {
        touch-action: manipulation;
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    #gameCanvas {
        touch-action: none;
    }
        
    </style>
</head>
<body>
    <div id="background"></div>
    <canvas id="gameCanvas"></canvas>
    <script src="game.js"></script>
    <div id="startScreen">
    <div class="start-content">
        <h1>Grandma's sheep have escaped, help her collect them. <br>(jump on objects to navigate scene)</h1>
        <button id="startButton">Start Game</button>
    </div>
</div>


</body>
</html>
