document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        initializeGame();
    });
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Images
const bg = createImage('pictures/bg.jpg');
const walkSprites = [
    createImage('pictures/walk1.png'),
    createImage('pictures/walk2.png'),
    createImage('pictures/walk3.png'),
    createImage('pictures/walk4.png')
];
const jumpSprite = createImage('pictures/jump.png');
const platformsImg = createImage('pictures/platforms.png');
const SHEEP_WIDTH = 50;
const SHEEP_HEIGHT = 50;
const SHEEP_WALK_DISTANCE = 10;
const SHEEP_WALK_SPEED = 1;
const SHEEP_FALL_SPEED = 3;

// Audio files
const winSound = new Audio('audio/win.wav');
const loseSound = new Audio('audio/lose.wav');
const sheepCollectSounds = [
    new Audio('audio/1.wav'),
    new Audio('audio/2.wav'),
    new Audio('audio/3.wav'),
    new Audio('audio/4.wav'),
    new Audio('audio/5.wav'),
    new Audio('audio/6.wav'),
    new Audio('audio/7.wav'),
    new Audio('audio/8.wav'),
    new Audio('audio/9.wav'),
    new Audio('audio/10.wav')
];

// Global Constants
const INITIAL_SCALE = 4;
const BASE_SPEED = 5;
const BASE_JUMP_SPEED = -15;
const BASE_GRAVITY = 0.7;
const DOUBLE_JUMP_MULTIPLIER = 0.8; // adjust for second jump height
const CHARACTER_BOTTOM_OFFSET_PERCENT = 0.2;
const CHARACTER_INITIAL_X_PERCENT = 0.2; // Start at the center
const MOBILE_CONTROLS_HEIGHT = 200;
const LANDSCAPE_GAME_WIDTH_PERCENT = 0.60;
const RIGHT_CAMERA_FOLLOW_THRESHOLD = 0.25; // 60% of screen width when moving right
const LEFT_CAMERA_FOLLOW_THRESHOLD = 0.75;  // 40% of screen width when moving left
const MOBILE_CONTROL_WIDTH = 100; // Adjust this based on your actual control width
const MOBILE_LANDSCAPE_OFFSET = 10; // 10 pixel offset

// Global Variables
let lastTime = 0;
let platforms = [];
let characterX, characterY, jumping = true, currentFrame = 0, frameCount = 0, direction = 'right', isWalking = false;
let bgX = 0;
let characterScale = INITIAL_SCALE;
let bgScale = 1;
let speed = BASE_SPEED * (characterScale / INITIAL_SCALE);
let jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
let gravity = BASE_GRAVITY * (characterScale / INITIAL_SCALE);
let initialWindowWidth = window.innerWidth;
let initialWindowHeight = window.innerHeight;
let leftPressed = false;
let rightPressed = false;
let onPlatform = false;
let currentPlatform = null;
let jumpCount = 0; // Track the number of jumps
let sheepCollected = 0;
let gameLoopId;
let gameOver = false;
let gracePeriod = 3000; // 3 seconds in milliseconds
let gameStartTime;
let isInvulnerable = false;

// Character dimensions
const characterWidth = 50;
const characterHeight = 50;

const style = document.createElement('style');
style.textContent += `
    #victoryScreen, #gameOverScreen {
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
    .victory-content, .game-over-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
    }
    #restartButton {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

class Coyote {
    constructor(worldX) {
        this.worldX = worldX;
        this.x = worldX;
        this.y = -50; // Start above the screen
        this.width = 50;
        this.height = 50;
        this.falling = true;
        this.walkingRight = Math.random() < 0.5;
        this.startX = worldX;
        this.sprite1 = createImage('pictures/coyote1.png');
        this.sprite2 = createImage('pictures/coyote2.png');
        this.currentSprite = this.sprite1;
        this.animationCounter = 0;
    }

    update() {
        if (this.falling) {
            this.y += SHEEP_FALL_SPEED;
            this.checkLanding();
        } else {
            this.walk();
        }
        this.animate();
        this.x = this.worldX + bgX;
    }

    checkLanding() {
        for (let platform of platforms) {
            if (this.y + this.height >= platform.y * bgScale &&
                this.y + this.height <= platform.y * bgScale + platform.height * bgScale &&
                this.worldX >= platform.x * bgScale &&
                this.worldX + this.width <= (platform.x + platform.width) * bgScale) {
                this.y = platform.y * bgScale - this.height;
                this.falling = false;
                this.startX = this.worldX;
                this.endX = Math.min(this.startX + 100, (platform.x + platform.width) * bgScale - this.width);
                break;
            }
        }
    }

    walk() {
        if (this.walkingRight) {
            this.worldX += SHEEP_WALK_SPEED;
            if (this.worldX >= this.endX) {
                this.walkingRight = false;
            }
        } else {
            this.worldX -= SHEEP_WALK_SPEED;
            if (this.worldX <= this.startX) {
                this.walkingRight = true;
            }
        }
    }

    animate() {
        this.animationCounter++;
        if (this.animationCounter >= 10) {
            this.currentSprite = (this.currentSprite === this.sprite1) ? this.sprite2 : this.sprite1;
            this.animationCounter = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        if (!this.walkingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.currentSprite, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

class Tumbleweed {
    constructor(worldX) {
        this.worldX = worldX;
        this.x = worldX;
        this.y = -50; // Start above the screen
        this.width = 40;
        this.height = 40;
        this.falling = true;
        this.movingRight = Math.random() < 0.5;
        this.startX = worldX;
        this.sprites = [
            createImage('pictures/weed1.png'),
            createImage('pictures/weed2.png'),
            createImage('pictures/weed3.png'),
            createImage('pictures/weed4.png')
        ];
        this.currentSpriteIndex = 0;
        this.animationCounter = 0;
    }

    update() {
        if (this.falling) {
            this.y += SHEEP_FALL_SPEED;
            this.checkLanding();
        } else {
            this.move();
        }
        this.animate();
        this.x = this.worldX + bgX;
    }

    checkLanding() {
        for (let platform of platforms) {
            if (this.y + this.height >= platform.y * bgScale &&
                this.y + this.height <= platform.y * bgScale + platform.height * bgScale &&
                this.worldX >= platform.x * bgScale &&
                this.worldX + this.width <= (platform.x + platform.width) * bgScale) {
                this.y = platform.y * bgScale - this.height;
                this.falling = false;
                this.startX = this.worldX;
                this.endX = Math.min(this.startX + 100, (platform.x + platform.width) * bgScale - this.width);
                break;
            }
        }
    }

    move() {
        if (this.movingRight) {
            this.worldX += SHEEP_WALK_SPEED * 1.5;
            if (this.worldX >= this.endX) {
                this.movingRight = false;
            }
        } else {
            this.worldX -= SHEEP_WALK_SPEED * 1.5;
            if (this.worldX <= this.startX) {
                this.movingRight = true;
            }
        }
    }

    animate() {
        this.animationCounter++;
        if (this.animationCounter >= 5) {
            this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.sprites.length;
            this.animationCounter = 0;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.sprites[this.currentSpriteIndex], this.x, this.y, this.width, this.height);
    }
}

class Sheep {
    constructor(worldX) {
        this.worldX = worldX; // This is the sheep's position in the world
        this.x = worldX; // This will be the sheep's position relative to the camera
        this.y = -SHEEP_HEIGHT;
        this.width = SHEEP_WIDTH;
        this.height = SHEEP_HEIGHT;
        this.falling = true;
        this.walkingRight = Math.random() < 0.5;
        this.startX = worldX;
        this.sprite1 = createImage('pictures/sheep1.png');
        this.sprite2 = createImage('pictures/sheep2.png');
        this.currentSprite = this.sprite1;
        this.animationCounter = 0;
    }

    update() {
        if (this.falling) {
            this.y += SHEEP_FALL_SPEED;
            this.checkLanding();
        } else {
            this.walk();
        }
        this.animate();
        // Update the x position relative to the camera
        this.x = this.worldX + bgX;
    }

    checkLanding() {
        for (let platform of platforms) {
            if (this.y + this.height >= platform.y * bgScale &&
                this.y + this.height <= platform.y * bgScale + platform.height * bgScale &&
                this.worldX >= platform.x * bgScale &&
                this.worldX + this.width <= (platform.x + platform.width) * bgScale) {
                this.y = platform.y * bgScale - this.height;
                this.falling = false;
                this.startX = this.worldX;
                break;
            }
        }
    }

    walk() {
        if (this.walkingRight) {
            this.worldX += SHEEP_WALK_SPEED;
            if (this.worldX >= this.startX + SHEEP_WALK_DISTANCE) {
                this.walkingRight = false;
            }
        } else {
            this.worldX -= SHEEP_WALK_SPEED;
            if (this.worldX <= this.startX - SHEEP_WALK_DISTANCE) {
                this.walkingRight = true;
            }
        }
    }

    animate() {
        this.animationCounter++;
        if (this.animationCounter >= 10) {
            this.currentSprite = (this.currentSprite === this.sprite1) ? this.sprite2 : this.sprite1;
            this.animationCounter = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        if (!this.walkingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.currentSprite, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

let sheep = [];
let coyotes = [];
let tumbleweeds = [];

function initializeObstacles() {
    const MIN_DISTANCE = 100; // Adjusted minimum distance for more flexibility
    const attempts = 200; // Increased attempts to improve chances of placement

    function placeObstacle(ObstacleClass, array) {
        for (let i = 0; i < 2; i++) {
            let placed = false;
            let newObstacle;

            for (let attempt = 0; attempt < attempts; attempt++) {
                let x = Math.random() * (bg.width * bgScale - 50);
                newObstacle = new ObstacleClass(x);

                if (isObstaclePositionValid(newObstacle, MIN_DISTANCE)) {
                    array.push(newObstacle);
                    placed = true;
                    console.log(`Placed ${ObstacleClass.name} at ${newObstacle.worldX}`);
                    break;
                }
            }

            if (!placed) {
                console.log(`Couldn't place ${ObstacleClass.name} ${i + 1} after ${attempts} attempts`);
            }
        }
    }

    // Clear existing obstacles
    coyotes = [];
    tumbleweeds = [];

    // Place new obstacles
    placeObstacle(Coyote, coyotes);
    placeObstacle(Tumbleweed, tumbleweeds);
}

function isObstaclePositionValid(newObstacle, minDistance) {
    for (let existingObstacle of [...sheep, ...coyotes, ...tumbleweeds]) {
        let distance = Math.abs(newObstacle.worldX - existingObstacle.worldX);
        if (distance < minDistance) {
            console.log(`Obstacle too close: ${distance}px (min ${minDistance}px)`);
            return false;
        }
    }
    return true;
}


// Event Listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
window.addEventListener('resize', resizeCanvas, false);

function createImage(src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    return img;
}

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
            z-index: 20;
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
            user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            transition: background-color 0.1s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #mobileControls button:active {
            background-color: rgba(0, 255, 0, 0.5) !important;
        }
    `;

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        
        if (x < canvas.width / 2) {
            leftPressed = true;
            rightPressed = false;
        } else {
            leftPressed = false;
            rightPressed = true;
        }
    }, false);

    canvas.addEventListener('touchend', function(e) {
        leftPressed = false;
        rightPressed = false;
    }, false);

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
            mobileControls.style.flexDirection = 'row';
            mobileControls.style.height = '100%';
            mobileControls.style.width = '100%';
            mobileControls.style.position = 'fixed';
            mobileControls.style.top = '0';
            mobileControls.style.left = '0';

            leftControls.style.flexDirection = 'column';
            leftControls.style.position = 'absolute';
            leftControls.style.left = '0';
            leftControls.style.top = '50%';
            leftControls.style.transform = 'translateY(-50%)';
            leftControls.style.width = `${MOBILE_CONTROL_WIDTH}px`;

            rightControls.style.flexDirection = 'column';
            rightControls.style.position = 'absolute';
            rightControls.style.right = '0';
            rightControls.style.top = '50%';
            rightControls.style.transform = 'translateY(-50%)';
            rightControls.style.width = `${MOBILE_CONTROL_WIDTH}px`;
        } else {
            // Portrait mode layout remains the same
            // ...
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

function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Set canvas height to 100% of the window height
    canvas.height = windowHeight;

    // Set canvas width to window width minus 10 pixels
    canvas.width = windowWidth - 10;

    if (isMobile() && isLandscape()) {
        const totalControlWidth = (MOBILE_CONTROL_WIDTH + MOBILE_LANDSCAPE_OFFSET) * 2;
        const availableWidth = windowWidth - totalControlWidth;
        
        canvas.width = availableWidth;
        canvas.height = windowHeight;
        canvas.style.position = 'absolute';
        canvas.style.left = `${MOBILE_CONTROL_WIDTH + MOBILE_LANDSCAPE_OFFSET}px`;
        canvas.style.top = '0';
    } else if (isMobile()) {
        // Portrait mode code remains the same
        canvas.height = windowHeight - MOBILE_CONTROLS_HEIGHT;
        canvas.width = windowWidth;
        canvas.style.position = 'static';
    } else {
        // Non-mobile code remains the same
        canvas.height = windowHeight - 200;
        canvas.width = windowWidth;
        canvas.style.position = 'static';
    }

    bgScale = canvas.height / bg.height;
    characterScale = INITIAL_SCALE * (canvas.height / bg.height);

    characterX = (canvas.width * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);
    characterY = 0; // Start high above the canvas

    speed = BASE_SPEED * (characterScale / INITIAL_SCALE);
    jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
    gravity = BASE_GRAVITY * (characterScale / INITIAL_SCALE);

    updateControlLayout();
}

// Call resizeCanvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Call resizeCanvas initially to set the correct size
window.addEventListener('load', resizeCanvas);

function extractPlatformsFromImage(image) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    
    try {
        tempCtx.drawImage(image, 0, 0);
        const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                const index = (y * image.width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                if (r === 255 && g === 255 && b === 255 && a === 255) {
                    platforms.push({ x: x, y: y, width: 1, height: 1 });
                }
            }
        }

        platforms = combinePlatforms(platforms);
     
    } catch (error) {
        console.error("Error extracting platforms:", error);
    }
}

function combinePlatforms(platforms) {
    const combinedPlatforms = [];
    let currentPlatform = null;

    platforms.forEach(platform => {
        if (currentPlatform && currentPlatform.y === platform.y && currentPlatform.x + currentPlatform.width === platform.x) {
            currentPlatform.width += platform.width;
        } else {
            if (currentPlatform) {
                combinedPlatforms.push(currentPlatform);
            }
            currentPlatform = { ...platform };
        }
    });

    if (currentPlatform) {
        combinedPlatforms.push(currentPlatform);
    }

    return combinedPlatforms;
}

function checkPlatformCollision() {
    let landedOnPlatform = false;
    let newPlatform = null;

    const characterBottom = characterY + characterHeight * characterScale;
    const characterRight = characterX + characterWidth * characterScale;

    sheep = sheep.filter(s => {
        if (!s.falling &&
            characterX < s.x + s.width &&
            characterRight > s.x &&
            characterY < s.y + s.height &&
            characterBottom > s.y) {
            // Collision detected
            sheepCollected++;
            playSheepCollectSound(sheepCollected); // Play sheep collect sound
            // Check for victory
            if (sheepCollected >= 10) {
                showVictoryScreen();
            }
            return false;
        }
        return true;
    });

    const landingTolerance = 5; 
    const edgeTolerance = 25;

    for (let platform of platforms) {
        const scaledPlatform = {
            x: platform.x * bgScale + bgX,
            y: platform.y * bgScale,
            width: platform.width * bgScale,
            height: platform.height * bgScale
        };

        if (characterX + edgeTolerance < scaledPlatform.x + scaledPlatform.width &&
            characterRight - edgeTolerance > scaledPlatform.x) {
            
            // Check if character is landing on the platform (moving downwards)
            if (jumpSpeed >= 0 && 
                characterBottom <= scaledPlatform.y + landingTolerance &&
                characterBottom + jumpSpeed >= scaledPlatform.y - landingTolerance) {
                
                landedOnPlatform = true;
                newPlatform = {
                    ...scaledPlatform,
                    originalLeft: platform.x * bgScale,
                    originalRight: (platform.x + platform.width) * bgScale
                };
                characterY = scaledPlatform.y - characterHeight * characterScale;
                jumpSpeed = 0;
                jumping = false;
                jumpCount = 0;
                break;
            }
        }
    }

    if (landedOnPlatform) {
        onPlatform = true;
        currentPlatform = newPlatform;
    } else if (currentPlatform) {
        // Check if still on current platform
        const currentPlatformLeftEdge = currentPlatform.originalLeft + bgX;
        const currentPlatformRightEdge = currentPlatform.originalRight + bgX;
        if (characterX + characterWidth * characterScale - edgeTolerance <= currentPlatformLeftEdge || 
            characterX + edgeTolerance >= currentPlatformRightEdge ||
            characterBottom < currentPlatform.y - landingTolerance) {
            onPlatform = false;
            currentPlatform = null;
            jumping = true;
        }
    }

}

function checkObstacleCollision() {
    if (isInvulnerable) return false;

    const characterBottom = characterY + characterHeight * characterScale;
    const characterRight = characterX + characterWidth * characterScale;

    const collisionBuffer = 20; // Adjust this value to make the collision tighter

    for (let obstacle of [...coyotes, ...tumbleweeds]) {
        if (
            characterX + collisionBuffer < obstacle.x + obstacle.width &&
            characterRight - collisionBuffer > obstacle.x &&
            characterY + collisionBuffer < obstacle.y + obstacle.height &&
            characterBottom - collisionBuffer > obstacle.y
        ) {
            // Collision detected
            console.log("Collision with obstacle!");
            showGameOverScreen();
            return true; // Collision occurred
        }
    }
    return false; // No collision
}


function update(dt) {
    if (gameOver) return;

    // Check if grace period has ended
    if (isInvulnerable && Date.now() - gameStartTime > gracePeriod) {
        isInvulnerable = false;
    }

    // Only check for collisions if not invulnerable
    if (!isInvulnerable && checkObstacleCollision()) {
        gameOver = true;
        return;
    }

    isWalking = false;  // Reset at the start of each frame
    if (gameOver) return; // Stop updating if the game is over

    if (checkObstacleCollision()) {
        gameOver = true; // Set gameOver flag to true on collision
        return;
    }
    let moveX = 0;
    if (leftPressed) {
        isWalking = true;
        direction = 'left';
        moveX = -speed;
    } else if (rightPressed) {
        isWalking = true;
        direction = 'right';
        moveX = speed;
    }

    // Apply movement
    if (moveX !== 0) {
        const maxBgX = 0;
        const minBgX = -bg.width * bgScale + canvas.width;

        if (moveX > 0) {  // Moving right
            if (characterX < canvas.width * RIGHT_CAMERA_FOLLOW_THRESHOLD || bgX <= minBgX) {
                characterX += moveX;
            } else {
                bgX -= moveX;
            }
        } else {  // Moving left
            if (characterX > canvas.width * LEFT_CAMERA_FOLLOW_THRESHOLD || bgX >= maxBgX) {
                characterX += moveX;
            } else {
                bgX -= moveX;
            }
        }

        // Ensure bgX stays within bounds
        bgX = Math.max(minBgX, Math.min(maxBgX, bgX));
    }

    // Apply gravity and jumping
    if (jumping || (!onPlatform && characterY < canvas.height)) {
        jumpSpeed += gravity;
        characterY += jumpSpeed;
    }

    checkPlatformCollision();

    sheep.forEach(s => s.update());
    coyotes.forEach(c => c.update());
    tumbleweeds.forEach(t => t.update());

    // Prevent character from going through the bottom of the canvas
    if (characterY > canvas.height) {
        characterY = canvas.height;
        jumping = false;
        onPlatform = false;
        currentPlatform = null;
        jumpSpeed = 0;
    }

    if (isWalking && !jumping) {
        frameCount++;
        if (frameCount % 5 === 0) {
            currentFrame = (currentFrame + 1) % walkSprites.length;
        }
    } else if (!isWalking) {
        currentFrame = 0;
    }

    // Ensure character stays within the canvas
    characterX = Math.max(0, Math.min(canvas.width - characterWidth * characterScale, characterX));
}

function jump() {
    if (!jumping && onPlatform) {
        jumping = true;
        onPlatform = false;
        currentPlatform = null;
        jumpSpeed = Math.min(jumpSpeed, BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE));
        characterY += jumpSpeed;
        jumpCount = 1;
    } else if (jumping && jumpCount === 1) {
        jumpSpeed = Math.min(jumpSpeed, BASE_JUMP_SPEED * DOUBLE_JUMP_MULTIPLIER * (characterScale / INITIAL_SCALE));
        characterY += jumpSpeed;
        jumpCount = 2;
    }
}

function draw() {
    console.log("Drawing frame");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, bgX, 0, bg.width * bgScale, canvas.height);
    drawSheepCounter();

    // Draw platforms
    ctx.fillStyle = 'rgba(255, 0, 0, 0)';
    for (let platform of platforms) {
        ctx.fillRect(
            platform.x * bgScale + bgX,  // Add bgX here, don't subtract
            platform.y * bgScale,
            platform.width * bgScale,
            platform.height * bgScale
        );
    }

    sheep.forEach(s => s.draw(ctx));
    coyotes.forEach(c => c.draw(ctx));
    tumbleweeds.forEach(t => t.draw(ctx));

    // Draw character
    ctx.save();
    let scaledWidth = characterWidth * characterScale;
    let scaledHeight = characterHeight * characterScale;
    let drawX = characterX;
    let drawY = characterY;

    if (direction === 'left') {
        ctx.translate(drawX + scaledWidth / 2, drawY + scaledHeight / 2);
        ctx.scale(-1, 1);
        ctx.translate(-drawX - scaledWidth / 2, -drawY - scaledHeight / 2);
    }

    if (jumping) {
        ctx.drawImage(jumpSprite, drawX, drawY, scaledWidth, scaledHeight);
    } else if (isWalking) {
        ctx.drawImage(walkSprites[currentFrame], drawX, drawY, scaledWidth, scaledHeight);
    } else {
        ctx.drawImage(walkSprites[0], drawX, drawY, scaledWidth, scaledHeight);  // Use first frame as idle pose
    }

    // Draw invulnerability indicator
    if (isInvulnerable) {
        ctx.save();
        const remainingTime = Math.ceil((gracePeriod - (Date.now() - gameStartTime)) / 1000);
        // Draw semi-transparent white background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';  // White with 70% opacity
        ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 60, 400, 120);  // Adjust size as needed

        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Get ready to catch sheep!`, canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText(`Starting in: ${remainingTime}`, canvas.width / 2, canvas.height / 2 + 30);
        ctx.restore();
    }
    ctx.restore();
}

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    let deltaTime = currentTime - lastTime;

    update(deltaTime / 1000); // Convert to seconds, but not used in update function currently

    draw();
    lastTime = currentTime;

    gameLoopId = requestAnimationFrame(gameLoop);
}

function initializeSheep() {
    const MIN_DISTANCE = 75;
    const attempts = 100; // Maximum attempts to place a sheep

    for (let i = 0; i < 10; i++) {
        let placed = false;
        let newSheep;

        for (let attempt = 0; attempt < attempts; attempt++) {
            let x = Math.random() * (bg.width * bgScale - SHEEP_WIDTH);
            newSheep = new Sheep(x);

            if (isSheepPositionValid(newSheep, MIN_DISTANCE)) {
                sheep.push(newSheep);
                placed = true;
                break;
            }
        }

        if (!placed) {
            console.log(`Couldn't place sheep ${i + 1} after ${attempts} attempts`);
        }
    }
}

function isSheepPositionValid(newSheep, minDistance) {
    for (let existingSheep of sheep) {
        let distance = Math.abs(newSheep.worldX - existingSheep.worldX);
        if (distance < minDistance) {
            return false;
        }
    }
    return true;
}

function drawHUD() {
    const hudCanvas = document.createElement('canvas');
    hudCanvas.id = 'hudCanvas';
    if (isMobile() && isLandscape()) {
        hudCanvas.height = window.innerHeight;
        hudCanvas.width = window.innerWidth - (MOBILE_CONTROL_WIDTH + MOBILE_LANDSCAPE_OFFSET) * 2;
        hudCanvas.style.position = 'fixed';
        hudCanvas.style.top = '0';
        hudCanvas.style.left = `${MOBILE_CONTROL_WIDTH + MOBILE_LANDSCAPE_OFFSET}px`;
    } else {
        hudCanvas.height = 200;
        hudCanvas.width = window.innerWidth;
        hudCanvas.style.position = 'fixed';
        hudCanvas.style.bottom = '0';
        hudCanvas.style.left = '0';
    }
    hudCanvas.style.zIndex = '10';
    document.body.appendChild(hudCanvas);

    const hudCtx = hudCanvas.getContext('2d');
    hudCtx.fillStyle = 'rgba(0, 0, 0, 0)';
    hudCtx.fillRect(0, 0, hudCanvas.width, hudCanvas.height);
}

function drawSheepCounter() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText(`Sheep: ${sheepCollected}/10`, canvas.width - 10, 30);
}

let loadedImages = 0;
const totalImages = walkSprites.length + 3; // Include bg, jumpSprite, and platformsImg

function imageLoaded(e) {
    loadedImages++;
    console.log(`Image loaded: ${e.target.src}`);
    if (loadedImages === totalImages) {
      
    }
}

function imageError(e) {
    console.error(`Error loading image: ${e.target.src}`);
}

bg.onload = imageLoaded;
bg.onerror = imageError;

jumpSprite.onload = imageLoaded;
jumpSprite.onerror = imageError;

walkSprites.forEach(sprite => {
    sprite.onload = imageLoaded;
    sprite.onerror = imageError;
});

platformsImg.onload = imageLoaded;
platformsImg.onerror = imageError;

function showVictoryScreen() {
    console.log("Showing victory screen");

    const victoryScreen = document.createElement('div');
    victoryScreen.id = 'victoryScreen';
    victoryScreen.innerHTML = `
        <div class="victory-content">
            <h1>You caught all of grandma's sheep!</h1>
            <button id="restartButton">Play Again</button>
        </div>
    `;
    document.body.appendChild(victoryScreen);

    playWinSound(); // Play win sound

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);

    // Stop the game loop
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
}

function showGameOverScreen() {
    console.log("Showing game over screen");

    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.innerHTML = `
        <div class="game-over-content" style="background-color: white;">
            <h1>Game Over</h1>
            <p>You hit an obstacle!</p>
            <button id="restartButton">Play Again</button>
        </div>
    `;
    document.body.appendChild(gameOverScreen);

    playLoseSound(); // Play lose sound

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);

    // Stop the game loop
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
    gameOver = true; // Set gameOver flag to true
}

function playSheepCollectSound(sheepCollected) {
    if (sheepCollected >= 1 && sheepCollected <= 10) {
        sheepCollectSounds[sheepCollected - 1].play();
    }
}

function playWinSound() {
    winSound.play();
}

function playLoseSound() {
    loseSound.play();
}

function restartGame() {
    // Remove victory screen or game over screen
    const victoryScreen = document.getElementById('victoryScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    if (victoryScreen) {
        victoryScreen.remove();
    }
    if (gameOverScreen) {
        gameOverScreen.remove();
    }

    // Reset game state
    sheepCollected = 0;
    sheep = [];
    coyotes = [];
    tumbleweeds = [];
    
    // Reset character position
    characterX = (canvas.width * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);
    characterY = 0;
    jumping = true;
    onPlatform = false;
    currentPlatform = null;
    jumpSpeed = 0;
    
    // Reset background position
    bgX = 0;

    // Reinitialize game elements
    initializeSheep();
    initializeObstacles();

    // Reset time variables
    lastTime = 0;

    // Reset gameOver flag
    gameOver = false;

    // Restart game loop
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gameLoopId = null; // Ensure gameLoopId is null before restarting
    gameLoopId = requestAnimationFrame(gameLoop);
}

function initializeGame() {
    initialWindowWidth = window.innerWidth;
    initialWindowHeight = window.innerHeight - (isMobile() && isLandscape() ? window.innerHeight * 0.30 : MOBILE_CONTROLS_HEIGHT);

    canvas.width = initialWindowWidth;
    canvas.height = initialWindowHeight;

    bgScale = canvas.height / bg.height;
    characterScale = INITIAL_SCALE * (canvas.height / bg.height);

    characterX = (initialWindowWidth * CHARACTER_INITIAL_X_PERCENT) - ((characterWidth * characterScale) / 2);
    characterY = 0; // Start high above the canvas

    speed = BASE_SPEED * (characterScale / INITIAL_SCALE);
    jumpSpeed = BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE);
    gravity = BASE_GRAVITY * (characterScale / INITIAL_SCALE);

    setupMobileControls(jump);
    resizeCanvas();
    drawHUD();

    extractPlatformsFromImage(platformsImg);

    initializeSheep();
    initializeObstacles(); // Call this function to initialize obstacles

    gameStartTime = Date.now();
    isInvulnerable = true;

    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    gameLoopId = requestAnimationFrame(gameLoop);
}

