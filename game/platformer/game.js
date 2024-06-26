const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bg = new Image();
bg.src = 'pictures/bg.jpg';

const walkSprites = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
];
walkSprites[0].src = 'pictures/walk1.png';
walkSprites[1].src = 'pictures/walk2.png';
walkSprites[2].src = 'pictures/walk3.png';
walkSprites[3].src = 'pictures/walk4.png';

const jumpSprite = new Image();
jumpSprite.src = 'pictures/jump.png';

let characterX;
let characterY;
let jumping = false;
let currentFrame = 0;
let frameCount = 0;
let direction = 'right';
let isWalking = false;
let bgX = 0; // Initial background position

// Character dimensions
const characterWidth = 50;
const characterHeight = 50;

// Scaling factors
const INITIAL_SCALE = 5; // Initial scale value for the character
let characterScale = INITIAL_SCALE;
let bgScale = 1;

// Base values for speed and jumping
const BASE_SPEED = 8;
const BASE_JUMP_SPEED = -14;
const BASE_GRAVITY = 0.5;

// Scaled values
let speed = BASE_SPEED;
let jumpSpeed = BASE_JUMP_SPEED;
let gravity = BASE_GRAVITY;

// Character position relative to bottom
const CHARACTER_BOTTOM_OFFSET_PERCENT = 0.28; // 24% from bottom, adjust as needed
const CHARACTER_INITIAL_X_PERCENT = 0.51; // 51% from left, adjust as needed

// Store the initial window dimensions
let initialWindowWidth = window.innerWidth;
let initialWindowHeight = window.innerHeight;

// Mobile controls height
const MOBILE_CONTROLS_HEIGHT = 200;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
window.addEventListener('resize', resizeCanvas, false);

// Mobile controls
let leftPressed = false;
let rightPressed = false;

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function isLandscape() {
    return window.innerWidth > window.innerHeight;
}

function setupMobileControls(jumpCallback) {
    const mobileControls = document.createElement('div');
    mobileControls.id = 'mobileControls';
    mobileControls.innerHTML = `
        <div id="leftControls" class="controlGroup left">
            <button id="leftBtn">⟵</button>
            <button id="rightBtn">⟶</button>
        </div>
        <div id="rightControls" class="controlGroup right">
            <button id="jumpBtn">↷</button>
        </div>
    `;
    document.body.appendChild(mobileControls);

    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const jumpBtn = document.getElementById('jumpBtn');

    function setButtonColor(button, isPressed) {
        button.style.backgroundColor = isPressed ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    }

    leftBtn.addEventListener('touchstart', () => {
        leftPressed = true;
        setButtonColor(leftBtn, true);
        navigator.vibrate(50);
    });
    leftBtn.addEventListener('touchend', () => {
        leftPressed = false;
        setButtonColor(leftBtn, false);
    });

    rightBtn.addEventListener('touchstart', () => {
        rightPressed = true;
        setButtonColor(rightBtn, true);
        navigator.vibrate(50);
    });
    rightBtn.addEventListener('touchend', () => {
        rightPressed = false;
        setButtonColor(rightBtn, false);
    });

    jumpBtn.addEventListener('touchstart', () => {
        jumpCallback();
        setButtonColor(jumpBtn, true);
        navigator.vibrate(50);
    });
    jumpBtn.addEventListener('touchend', () => {
        setButtonColor(jumpBtn, false);
    });

    const style = document.createElement('style');
    style.textContent = `
        #mobileControls {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
            z-index: 20; // Higher than the HUD
        }
        .controlGroup {
            display: flex;
            pointer-events: auto;
        }
        #leftControls {
            flex-direction: column;
        }
        #rightControls {
            flex-direction: column;
        }
        #mobileControls button {
            width: 80px;
            height: 80px;
            margin: 5px;
            font-size: 50px;
            font-weight: bold;
            border-radius: 20%;
            border: none;
            background-color: rgba(255, 255, 255, 0.5);
            color: #000;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0); // Remove tap highlight color
            transition: background-color 0.1s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #mobileControls button:active {
            background-color: rgba(0, 255, 0, 0.5) !important;
        }
    `;
    document.head.appendChild(style);

    updateControlLayout();
}


function updateControlLayout() {
    const mobileControls = document.getElementById('mobileControls');
    const leftControls = document.getElementById('leftControls');
    const rightControls = document.getElementById('rightControls');

    if (isMobile()) {
        mobileControls.style.display = 'flex';

        if (isLandscape()) {
            // Landscape mode
            mobileControls.style.flexDirection = 'row';
            mobileControls.style.height = `${window.innerHeight * 0.30}px`; // 30% of the screen height
            mobileControls.style.bottom = '0';

            leftControls.style.flexDirection = 'column';
            leftControls.style.position = 'fixed';
            leftControls.style.left = '20px';
            leftControls.style.top = `${window.innerHeight * 0.35}px`; // 50% of the canvas height (which is 70% of the screen height)
            leftControls.style.transform = 'translateY(-50%)';

            rightControls.style.flexDirection = 'column';
            rightControls.style.position = 'fixed';
            rightControls.style.right = '20px';
            rightControls.style.top = `${window.innerHeight * 0.35}px`; // 50% of the canvas height (which is 70% of the screen height)
            rightControls.style.transform = 'translateY(-50%)';
        } else {
            // Portrait mode
            mobileControls.style.flexDirection = 'row';
            mobileControls.style.height = `${MOBILE_CONTROLS_HEIGHT}px`;

            leftControls.style.flexDirection = 'column';
            leftControls.style.position = 'absolute';
            leftControls.style.left = '20px';
            leftControls.style.bottom = '20px';
            leftControls.style.transform = 'none';

            rightControls.style.flexDirection = 'column';
            rightControls.style.position = 'absolute';
            rightControls.style.right = '20px';
            rightControls.style.bottom = '20px';
            rightControls.style.transform = 'none';
        }
    } else {
        mobileControls.style.display = 'none';
    }
}

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        isWalking = true;
        rightPressed = true;
        direction = 'right';
    } else if (e.key === 'ArrowLeft') {
        isWalking = true;
        leftPressed = true;
        direction = 'left';
    } else if (e.key === ' ') {
        jump();
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        isWalking = false;
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        isWalking = false;
        leftPressed = false;
    }
}


const LANDSCAPE_GAME_WIDTH_PERCENT = 0.60; // Change this value to adjust the width percentage of the game in landscape mode

function resizeCanvas() {
    if (isMobile() && isLandscape()) {
        const controlWidth = 100; // Approximate width of the control buttons including margins
        const availableWidth = window.innerWidth * LANDSCAPE_GAME_WIDTH_PERCENT; // Width between the control buttons
        canvas.height = window.innerHeight * 0.70; // 70% of the screen height
        canvas.width = availableWidth;
        canvas.style.position = 'absolute';
        canvas.style.left = `${(window.innerWidth - availableWidth) / 2}px`; // Center the canvas
    } else if (isMobile()) {
        canvas.height = window.innerHeight - MOBILE_CONTROLS_HEIGHT; // Default height in portrait mode
        canvas.width = window.innerWidth;
        canvas.style.position = 'static';
    } else {
        canvas.height = window.innerHeight - 200; // 200 pixels for desktop HUD
        canvas.width = window.innerWidth;
        canvas.style.position = 'static';
    }

    console.log(`Canvas size: ${canvas.width} x ${canvas.height}`);

    // Calculate background scale
    bgScale = canvas.height / bg.height;

    // Calculate character scale based on the same logic as the background
    characterScale = INITIAL_SCALE * (canvas.height / bg.height);

    // Adjust character X position to maintain center
    characterX = 50;

    // Set character Y position based on the defined percentage
    characterY = canvas.height - (canvas.height * CHARACTER_BOTTOM_OFFSET_PERCENT);

    // Scale speed and jumping based on character scale
    speed = BASE_SPEED * (characterScale / INITIAL_SCALE);
    jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
    gravity = BASE_GRAVITY * (characterScale / INITIAL_SCALE);

    console.log(`Character position: (${characterX}, ${characterY})`);
    console.log(`Character scale: ${characterScale}`);
    console.log(`Speed: ${speed}, Jump Speed: ${jumpSpeed}, Gravity: ${gravity}`);

    updateControlLayout();
}


function update() {
    if (leftPressed) {
        isWalking = true;
        direction = 'left';
        if (characterX > canvas.width / 2 || bgX >= 0) {
            characterX -= speed;
        } else {
            bgX += speed;
        }
    } else if (rightPressed) {
        isWalking = true;
        direction = 'right';
        if (characterX < canvas.width / 2 || bgX <= -bg.width * bgScale + canvas.width + 10) {
            characterX += speed;
        } else {
            bgX -= speed;
        }
    } else {
        isWalking = false;
    }

    if (jumping) {
        characterY += jumpSpeed;
        jumpSpeed += gravity;
        if (characterY > canvas.height - (canvas.height * CHARACTER_BOTTOM_OFFSET_PERCENT)) {
            characterY = canvas.height - (canvas.height * CHARACTER_BOTTOM_OFFSET_PERCENT);
            jumping = false;
        }
    }

    if (isWalking && !jumping) {
        frameCount++;
        if (frameCount % 5 === 0) {
            currentFrame = (currentFrame + 1) % walkSprites.length;
        }
    } else if (!isWalking) {
        currentFrame = 0;
    }

    // Ensure characterX doesn't move out of bounds of the background
    if (bgX > 0) bgX = 0;
    if (bgX < -bg.width * bgScale + canvas.width) bgX = -bg.width * bgScale + canvas.width;
    if (characterX < 10) characterX = 10;
    if (characterX > canvas.width - characterWidth * characterScale - 10) characterX = canvas.width - characterWidth * characterScale - 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the scaled background
    ctx.drawImage(bg, bgX, 0, bg.width * bgScale, canvas.height);

    ctx.save(); // Save the current state

    // Calculate the character's position and size after scaling
    let scaledWidth = characterWidth * characterScale;
    let scaledHeight = characterHeight * characterScale;
    let drawX = characterX;
    let drawY = characterY;

    // Apply transformations
    if (direction === 'left') {
        ctx.translate(drawX + scaledWidth / 2, drawY + scaledHeight / 2);
        ctx.scale(-1, 1); // Flip horizontally
        ctx.translate(-drawX - scaledWidth / 2, -drawY - scaledHeight / 2);
    }

    // Draw the character sprite
    if (jumping) {
        ctx.drawImage(jumpSprite, drawX, drawY, scaledWidth, scaledHeight);
    } else {
        ctx.drawImage(walkSprites[currentFrame], drawX, drawY, scaledWidth, scaledHeight);
    }

    ctx.restore(); // Restore the original state
}

function jump() {
    if (!jumping) {
        jumping = true;
        jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
function drawHUD() {
    const hudCanvas = document.createElement('canvas');
    hudCanvas.id = 'hudCanvas';
    if (isMobile() && isLandscape()) {
        hudCanvas.height = window.innerHeight * 0.30; // 30% of the screen height in landscape mode
    } else {
        hudCanvas.height = 200; // Default height in desktop and portrait mode
    }
    hudCanvas.width = window.innerWidth;
    hudCanvas.style.position = 'fixed';
    hudCanvas.style.bottom = '0';
    hudCanvas.style.left = '0';
    hudCanvas.style.zIndex = '10'; // Ensure it's above the game canvas
    document.body.appendChild(hudCanvas);

    const hudCtx = hudCanvas.getContext('2d');
    hudCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    hudCtx.fillRect(0, 0, hudCanvas.width, hudCanvas.height);

    // Add some placeholder text
    hudCtx.fillStyle = 'white';
    hudCtx.font = '20px Arial';
    const text = 'HUD Placeholder';
    const textWidth = hudCtx.measureText(text).width;
    const xPosition = (hudCanvas.width - textWidth) / 2;
    const yPosition = (hudCanvas.height / 2) + 10; // Adjust for vertical centering

    hudCtx.fillText(text, xPosition, yPosition);
}


let loadedImages = 0;
const totalImages = walkSprites.length + 2; // +2 for bg and jumpSprite

function imageLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
        initialWindowWidth = window.innerWidth;
        initialWindowHeight = window.innerHeight - (isMobile() && isLandscape() ? window.innerHeight * 0.30 : MOBILE_CONTROLS_HEIGHT);
        
        // Set canvas size before calculating scales
        canvas.width = initialWindowWidth;
        canvas.height = initialWindowHeight;
        
        // Calculate initial scales
        bgScale = canvas.height / bg.height;
        characterScale = INITIAL_SCALE * (canvas.height / bg.height);
        
        // Set initial character position
        characterX = (initialWindowWidth * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);
        characterY = initialWindowHeight - (initialWindowHeight * CHARACTER_BOTTOM_OFFSET_PERCENT);
        
        // Calculate scaled speed and jumping
        speed = BASE_SPEED * (characterScale / INITIAL_SCALE);
        jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
        gravity = BASE_GRAVITY * (characterScale / INITIAL_SCALE);
        
        setupMobileControls(jump);
        resizeCanvas(); // Call resizeCanvas to ensure everything is set correctly
        drawHUD();
        gameLoop();
    }
}

bg.onload = imageLoaded;
jumpSprite.onload = imageLoaded;
walkSprites.forEach(sprite => sprite.onload = imageLoaded);
