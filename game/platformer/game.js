// game.js

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
let speed = 5;
let jumping = false;
let jumpSpeed = 0;
let gravity = 0.5;
let currentFrame = 0;
let frameCount = 0;
let direction = 'right';
let isWalking = false;
let bgX = 0; // Initial background position

// Character dimensions
const characterWidth = 50;
const characterHeight = 50;

// Scaling factors
const INITIAL_SCALE = 2.5; // Initial scale value for the character
let characterScale = INITIAL_SCALE;
let bgScale = 1;

// Character position relative to bottom
const CHARACTER_BOTTOM_OFFSET_PERCENT = 0.24; // 24% from bottom, adjust as needed
const CHARACTER_INITIAL_X_PERCENT = 0.51; // 51% from left, adjust as needed

// Store the initial window dimensions
let initialWindowWidth = window.innerWidth;
let initialWindowHeight = window.innerHeight;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
window.addEventListener('resize', resizeCanvas, false);

// Mobile controls
let leftPressed = false;
let rightPressed = false;

function setupMobileControls(jumpCallback) {
    const mobileControls = document.createElement('div');
    mobileControls.id = 'mobileControls';
    mobileControls.innerHTML = `
        <div class="controlGroup left">
            <button id="leftBtn">Left</button>
            <button id="leftJumpBtn">Jump</button>
        </div>
        <div class="controlGroup right">
            <button id="rightBtn">Right</button>
            <button id="rightJumpBtn">Jump</button>
        </div>
    `;
    document.body.appendChild(mobileControls);

    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const leftJumpBtn = document.getElementById('leftJumpBtn');
    const rightJumpBtn = document.getElementById('rightJumpBtn');

    leftBtn.addEventListener('touchstart', () => {
        leftPressed = true;
        navigator.vibrate(50); // Vibrate for 50 milliseconds
    });
    leftBtn.addEventListener('touchend', () => { leftPressed = false; });

    rightBtn.addEventListener('touchstart', () => {
        rightPressed = true;
        navigator.vibrate(50); // Vibrate for 50 milliseconds
    });
    rightBtn.addEventListener('touchend', () => { rightPressed = false; });

    function jump() {
        jumpCallback();
        navigator.vibrate(50); // Vibrate for 50 milliseconds
    }

    leftJumpBtn.addEventListener('touchstart', jump);
    rightJumpBtn.addEventListener('touchstart', jump);

    // Add CSS styles programmatically
    const style = document.createElement('style');
    style.textContent = `
        #mobileControls {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-between;
            pointer-events: none;
        }
        .controlGroup {
            display: flex;
            flex-direction: column;
            pointer-events: auto;
        }
        .controlGroup.left {
            margin-left: 20px;
        }
        .controlGroup.right {
            margin-right: 20px;
        }
        #mobileControls button {
            width: 80px;
            height: 80px;
            margin: 5px;
            font-size: 16px;
            border-radius: 50%;
            border: none;
            background-color: rgba(255, 255, 255, 0.5);
            color: #000;
        }
    `;
    document.head.appendChild(style);
}

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        isWalking = true;
        direction = 'right';
    } else if (e.key === 'ArrowLeft') {
        isWalking = true;
        direction = 'left';
    } else if (e.key === ' ') {
        if (!jumping) {
            jumping = true;
            jumpSpeed = -10;
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        isWalking = false;
    }
}

function resizeCanvas() {
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log(`Canvas size: ${canvas.width} x ${canvas.height}`);

    // Calculate background scale
    bgScale = canvas.height / bg.height;

    // Calculate character scale based on the same logic as the background
    characterScale = (canvas.height / initialWindowHeight) * INITIAL_SCALE;

    // Adjust character X position to maintain center
    characterX = (canvas.width * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);

    // Set character Y position based on the defined percentage
    characterY = canvas.height - (canvas.height * CHARACTER_BOTTOM_OFFSET_PERCENT);

    // Adjust background position
    bgX = (bgX / oldWidth) * canvas.width;

    console.log(`Character position: (${characterX}, ${characterY})`);
    console.log(`Character scale: ${characterScale}`);
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
    if (isWalking) {
        if (direction === 'right') {
            if (characterX < canvas.width / 2 || bgX <= -bg.width * bgScale + canvas.width + 10) {
                characterX += speed;
            } else {
                bgX -= speed;
            }
        } else if (direction === 'left') {
            if (characterX > canvas.width / 2 || bgX >= 0) {
                characterX -= speed;
            } else {
                bgX += speed;
            }
        }
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
        jumpSpeed = -10;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

let loadedImages = 0;
const totalImages = walkSprites.length + 2; // +2 for bg and jumpSprite

function imageLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
        initialWindowWidth = window.innerWidth;
        initialWindowHeight = window.innerHeight;
        
        // Set initial character scale
        characterScale = INITIAL_SCALE;
        
        // Set initial character position
        characterX = (initialWindowWidth * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);
        characterY = initialWindowHeight - (initialWindowHeight * CHARACTER_BOTTOM_OFFSET_PERCENT);
        
        setupMobileControls(jump);
        resizeCanvas();
        gameLoop();
    }
}

bg.onload = imageLoaded;
jumpSprite.onload = imageLoaded;
walkSprites.forEach(sprite => sprite.onload = imageLoaded);
