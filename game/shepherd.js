// Cache DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const popup = document.getElementById('popup');

// Constants
const ORIGINAL_WIDTH = 1400;
const ORIGINAL_HEIGHT = 933;
const SHEEP_SPAWN_INTERVAL = 3000;
const JUMP_DURATION = 1.25; // 1.75 seconds for the full jump
const JUMP_HEIGHT = 250;
const SHEEP_POOL_SIZE = 5;
const WINNING_SCORE = 5;

// Preload assets
const assetSources = [
    'pictures/sheep1.png',
    'pictures/sheep2.png',
    'pictures/stand1.png',
    'pictures/walk1.png',
    'pictures/walk2.png',
    'pictures/walk3.png',
    'pictures/walk4.png',
    'pictures/jump.png',
    'pictures/bg.jpg'
];

const assets = {};
let assetsLoaded = 0;

assetSources.forEach(src => {
    const img = new Image();
    img.onload = () => {
        assetsLoaded++;
        if (assetsLoaded === assetSources.length) {
            init();
        }
    };
    img.src = src;
    assets[src.split('/').pop()] = img;
});

// Game state
let scale = 1;
let frameCount = 0;
let lastTouchTime = 0;
let gameStarted = false;
let sheepCounter = 0;
let lastTime = 0;
let deltaTime = 0;

const shepherd = {
    x: ORIGINAL_WIDTH / 2 - 150,
    y: ORIGINAL_HEIGHT - 600,
    width: 300,
    height: 450,
    frameX: 0,
    frameTimer: 0,
    frameDuration: 1000 / 12, // 12 fps for shepherd animation
    speed: 9,
    moving: false,
    jumping: false,
    jumpProgress: 0
};

const sheepPool = [];

function createSheep() {
    return {
        x: ORIGINAL_WIDTH,
        y: ORIGINAL_HEIGHT - 380, // Changed from 400 to 380
        width: 150 * 1.25,
        height: 150 * 1.25,
        speed: 200, // pixels per second
        frameX: 0,
        frameTimer: 0,
        frameDuration: 1000 / 8, // 8 fps for sheep animation
        caught: false,
        active: false
    };
}

// Initialize game
function init() {
    for (let i = 0; i < SHEEP_POOL_SIZE; i++) {
        sheepPool.push(createSheep());
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouch);
    
    gameLoop();
    popup.style.display = 'block';
}

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    scale = Math.min(windowWidth / ORIGINAL_WIDTH, windowHeight / ORIGINAL_HEIGHT);

    canvas.width = ORIGINAL_WIDTH * scale;
    canvas.height = ORIGINAL_HEIGHT * scale;

    canvas.style.marginLeft = `${(windowWidth - canvas.width) / 2}px`;
    canvas.style.marginTop = `${(windowHeight - canvas.height) / 2}px`;

    shepherd.x = (ORIGINAL_WIDTH / 2 - shepherd.width / 2) * scale;
    shepherd.y = (ORIGINAL_HEIGHT - 600) * scale;

    sheepPool.forEach(sheep => {
        sheep.y = (ORIGINAL_HEIGHT - 380) * scale; // Changed from 400 to 380
        sheep.width = (150 * 1.25) * scale;
        sheep.height = (150 * 1.25) * scale;
        sheep.speed = 200 * scale;
    });
}

function handleKeyDown(e) {
    if (e.key === ' ' && !shepherd.jumping) {
        shepherd.jumping = true;
        shepherd.jumpProgress = 0;
    }
}

function handleTouch(e) {
    const currentTime = Date.now();
    if (currentTime - lastTouchTime < 300) {
        if (!shepherd.jumping) {
            shepherd.jumping = true;
            shepherd.jumpProgress = 0;
        }
    }
    lastTouchTime = currentTime;
}

function startGame() {
    popup.style.display = 'none';
    gameStarted = true;
    shepherd.moving = true;
    spawnSheep(); // Spawn first sheep immediately
    setInterval(spawnSheep, SHEEP_SPAWN_INTERVAL);
}

function spawnSheep() {
    const availableSheep = sheepPool.find(sheep => !sheep.active);
    if (availableSheep) {
        availableSheep.x = ORIGINAL_WIDTH * scale;
        availableSheep.y = (ORIGINAL_HEIGHT - 380) * scale; // Changed from 400 to 380
        availableSheep.caught = false;
        availableSheep.active = true;
    }
}

function updateGame(currentTime) {
    if (!gameStarted) return;

    deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    handleJump(deltaTime);
    updateSheep(deltaTime);
    handleSpriteFrame(deltaTime);
}

function handleJump(dt) {
    if (shepherd.jumping) {
        shepherd.jumpProgress += dt;
        const normalizedProgress = shepherd.jumpProgress / JUMP_DURATION;
        const jumpOffset = Math.sin(normalizedProgress * Math.PI) * JUMP_HEIGHT * scale;
        shepherd.y = (ORIGINAL_HEIGHT - 600) * scale - jumpOffset;

        if (shepherd.jumpProgress >= JUMP_DURATION) {
            shepherd.jumping = false;
            shepherd.jumpProgress = 0;
            shepherd.y = (ORIGINAL_HEIGHT - 600) * scale;
        }
    }
}

function updateSheep(dt) {
    sheepPool.forEach(sheep => {
        if (sheep.active && !sheep.caught) {
            sheep.x -= sheep.speed * dt;
            
            if (checkCollision(shepherd, sheep)) {
                if (!shepherd.jumping) {
                    sheep.caught = true;
                    sheepCounter++;
                    if (sheepCounter >= WINNING_SCORE) {
                        endGame();
                    }
                }
            }
            
            if (sheep.x + sheep.width * scale < 0) {
                sheep.active = false;
            }
        }
    });
}

function handleSpriteFrame(dt) {
    // Update shepherd frame
    shepherd.frameTimer += dt * 1000;
    if (shepherd.frameTimer >= shepherd.frameDuration) {
        shepherd.frameTimer = 0;
        shepherd.frameX = shepherd.moving ? (shepherd.frameX + 1) % 4 : 0;
    }

    // Update sheep frames
    sheepPool.forEach(sheep => {
        if (sheep.active && !sheep.caught) {
            sheep.frameTimer += dt * 1000;
            if (sheep.frameTimer >= sheep.frameDuration) {
                sheep.frameTimer = 0;
                sheep.frameX = 1 - sheep.frameX; // Toggle between 0 and 1
            }
        }
    });
}

function checkCollision(shepherd, sheep) {
    const shepherdMidX = shepherd.x + (shepherd.width * scale) / 2;
    const sheepMidX = sheep.x + (sheep.width * scale) / 2;
    
    // Check if the sheep's midpoint has passed the shepherd's midpoint
    if (sheepMidX <= shepherdMidX && sheepMidX > shepherdMidX - (sheep.speed * deltaTime)) {
        // Check vertical collision only if sheep midpoint is within the shepherd's width
        const shepherdMidY = shepherd.y + (shepherd.height * scale) / 2;
        const sheepMidY = sheep.y + (sheep.height * scale) / 2;
        
        const shepherdHalfHeight = (shepherd.height * scale) / 2;
        const sheepHalfHeight = (sheep.height * scale) / 2;
        
        return Math.abs(shepherdMidY - sheepMidY) < (shepherdHalfHeight + sheepHalfHeight);
    }
    
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(assets['bg.jpg'], 0, 0, canvas.width, canvas.height);

    if (gameStarted) {
        drawSheep();
        drawShepherd();
        drawScore();
    } else if (sheepCounter >= WINNING_SCORE) {
        endGame();
    }
}

function drawSheep() {
    sheepPool.forEach(sheep => {
        if (sheep.active && !sheep.caught) {
            const sheepSprite = assets[`sheep${sheep.frameX + 1}.png`];
            ctx.drawImage(sheepSprite, Math.round(sheep.x), Math.round(sheep.y), sheep.width, sheep.height);
        }
    });
}

function drawShepherd() {
    let sprite;
    if (shepherd.jumping) {
        sprite = assets['jump.png'];
    } else if (shepherd.moving) {
        sprite = assets[`walk${Math.floor(shepherd.frameX) + 1}.png`];
    } else {
        sprite = assets['stand1.png'];
    }
    ctx.drawImage(sprite, Math.round(shepherd.x), Math.round(shepherd.y), shepherd.width * scale, shepherd.height * scale);
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Sheep caught: ${sheepCounter}`, canvas.width - 200, 50);
}

function gameLoop(currentTime) {
    if (gameStarted) {
        updateGame(currentTime);
    }
    drawGame();
    requestAnimationFrame(gameLoop);
}
function endGame() {
    gameStarted = false;
    shepherd.moving = false;
    
    // Clear any existing intervals
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }

    // Show the winning message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Dynamic font size based on canvas width
    const baseFontSize = Math.min(canvas.width / 20, 48);
    ctx.font = `${baseFontSize}px Arial`;

    const message = "You caught all of Masani's sheep!";
    const subMessage = "Refresh the page to play again";

    // Word wrap function
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for(let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        return y;
    }

    // Draw main message
    let y = canvas.height / 2 - baseFontSize;
    y = wrapText(ctx, message, canvas.width / 2, y, canvas.width * 0.9, baseFontSize * 1.2);

    // Draw sub message
    ctx.font = `${baseFontSize * 0.5}px Arial`;
    wrapText(ctx, subMessage, canvas.width / 2, y + baseFontSize, canvas.width * 0.9, baseFontSize * 0.6);
}

// Game starts here
init();