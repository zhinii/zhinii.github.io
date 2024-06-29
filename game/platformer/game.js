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

// Global Constants
const INITIAL_SCALE = 4;
const BASE_SPEED = 5;
const BASE_JUMP_SPEED = -15;
const BASE_GRAVITY = 0.7;
const DOUBLE_JUMP_MULTIPLIER = 1; // adjust for second jump height
const CHARACTER_BOTTOM_OFFSET_PERCENT = 0.2;
const CHARACTER_INITIAL_X_PERCENT = 0.2; // Start at the center
const MOBILE_CONTROLS_HEIGHT = 200;
const LANDSCAPE_GAME_WIDTH_PERCENT = 0.60;
const RIGHT_CAMERA_FOLLOW_THRESHOLD = 0.25; // 60% of screen width when moving right
const LEFT_CAMERA_FOLLOW_THRESHOLD = 0.75;  // 40% of screen width when moving left

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

// Character dimensions
const characterWidth = 50;
const characterHeight = 50;

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
            mobileControls.style.height = `${window.innerHeight * 0.30}px`;
            mobileControls.style.bottom = '0';

            leftControls.style.flexDirection = 'column';
            leftControls.style.position = 'fixed';
            leftControls.style.left = '20px';
            leftControls.style.top = `${window.innerHeight * 0.35}px`;
            leftControls.style.transform = 'translateY(-50%)';

            rightControls.style.flexDirection = 'column';
            rightControls.style.position = 'fixed';
            rightControls.style.right = '20px';
            rightControls.style.top = `${window.innerHeight * 0.35}px`;
            rightControls.style.transform = 'translateY(-50%)';
        } else {
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

function resizeCanvas() {
    if (isMobile() && isLandscape()) {
        const controlWidth = 100;
        const availableWidth = window.innerWidth * LANDSCAPE_GAME_WIDTH_PERCENT;
        canvas.height = window.innerHeight * 0.70;
        canvas.width = availableWidth;
        canvas.style.position = 'absolute';
        canvas.style.left = `${(window.innerWidth - availableWidth) / 2}px`;
    } else if (isMobile()) {
        canvas.height = window.innerHeight - MOBILE_CONTROLS_HEIGHT;
        canvas.width = window.innerWidth;
        canvas.style.position = 'static';
    } else {
        canvas.height = window.innerHeight - 200;
        canvas.width = window.innerWidth;
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
        console.log("Platforms extracted:", platforms.map(p => ({
            x: p.x,
            y: p.y,
            width: p.width,
            height: p.height,
            scaledX: p.x * bgScale,
            scaledY: p.y * bgScale,
            scaledWidth: p.width * bgScale,
            scaledHeight: p.height * bgScale
        })));
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
                console.log("Landed on platform", {characterY, platformY: scaledPlatform.y});
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
            console.log("Left platform");
        }
    }

    console.log("Platform check complete", {onPlatform, jumping, characterY, jumpSpeed});
}

function update(dt) {
    isWalking = false;  // Reset at the start of each frame

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

    console.log("Update complete", {jumping, onPlatform, characterY, jumpSpeed, characterX, bgX});
}

function jump() {
    if (!jumping && onPlatform) {
        console.log("Jump initiated");
        jumping = true;
        onPlatform = false;
        currentPlatform = null;
        jumpSpeed = Math.min(jumpSpeed, BASE_JUMP_SPEED * (characterScale / INITIAL_SCALE));
        characterY += jumpSpeed;
        jumpCount = 1;
    } else if (jumping && jumpCount === 1) {
        console.log("Double jump initiated");
        jumpSpeed = Math.min(jumpSpeed, BASE_JUMP_SPEED * DOUBLE_JUMP_MULTIPLIER * (characterScale / INITIAL_SCALE));
        characterY += jumpSpeed;
        jumpCount = 2;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, bgX, 0, bg.width * bgScale, canvas.height);

    // Draw platforms
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    for (let platform of platforms) {
        ctx.fillRect(
            platform.x * bgScale + bgX,  // Add bgX here, don't subtract
            platform.y * bgScale,
            platform.width * bgScale,
            platform.height * bgScale
        );
    }

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

    ctx.restore();
}

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    let deltaTime = currentTime - lastTime;

    update(deltaTime / 1000); // Convert to seconds, but not used in update function currently

    draw();
    lastTime = currentTime;

    requestAnimationFrame(gameLoop);
}

function drawHUD() {
    const hudCanvas = document.createElement('canvas');
    hudCanvas.id = 'hudCanvas';
    if (isMobile() && isLandscape()) {
        hudCanvas.height = window.innerHeight * 0.30;
    } else {
        hudCanvas.height = 200;
    }
    hudCanvas.width = window.innerWidth;
    hudCanvas.style.position = 'fixed';
    hudCanvas.style.bottom = '0';
    hudCanvas.style.left = '0';
    hudCanvas.style.zIndex = '10';
    document.body.appendChild(hudCanvas);

    const hudCtx = hudCanvas.getContext('2d');
    hudCtx.fillStyle = 'rgba(0, 0, 0, 0)';
    hudCtx.fillRect(0, 0, hudCanvas.width, hudCanvas.height);

    hudCtx.fillStyle = 'white';
    hudCtx.font = '20px Arial';
    const text = 'HUD Placeholder';
    const textWidth = hudCtx.measureText(text).width;
    const xPosition = (hudCanvas.width - textWidth) / 2;
    const yPosition = (hudCanvas.height / 2) + 10;

    hudCtx.fillText(text, xPosition, yPosition);
}

let loadedImages = 0;
const totalImages = walkSprites.length + 3; // Include bg, jumpSprite, and platformsImg

function imageLoaded(e) {
    loadedImages++;
    console.log(`Image loaded: ${e.target.src}`);
    if (loadedImages === totalImages) {
        initializeGame();
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
    console.log("Platforms extracted:", platforms);

    gameLoop();
}
