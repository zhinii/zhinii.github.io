// Cache DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const ORIGINAL_WIDTH = 1400;
const ORIGINAL_HEIGHT = 933;
const JUMP_DURATION = 1.2;
const JUMP_HEIGHT = 325;
const SHEEP_POOL_SIZE = 3;
const COYOTE_POOL_SIZE = 2;
const WINNING_SCORE = 15;
const WEED_POOL_SIZE = 1;

// New spawning system variables
let lastSpawnTime = 0;
const MIN_SPAWN_INTERVAL = 2000; // 2 seconds in milliseconds
let spawnChance = 0.1; // Initial spawn chance (10%)
const SPAWN_CHANCE_INCREASE = 0.01; // Increase spawn chance by 1% for each sheep caught

// Preload assets
const assetSources = [
    'pictures/sheep1.png',
    'pictures/sheep2.png',
    'pictures/walk1.png',
    'pictures/walk2.png',
    'pictures/walk3.png',
    'pictures/walk4.png',
    'pictures/jump.png', 
    'pictures/bg.jpg',
    'pictures/coyote1.png',
    'pictures/coyote2.png',
    'pictures/weed1.png',
    'pictures/weed2.png',
    'pictures/weed3.png',
    'pictures/weed4.png'
];

const assets = {};
let assetsLoaded = 0;
let restartButton;

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
let gameState = 'playing'; // Can be 'playing', 'won', or 'lost'
let sheepCounter = 0;
let lastTime = 0;
let deltaTime = 0;

let shepherd;

const sheepPool = [];
const coyotePool = [];
const weedPool = [];

function createSheep() {
    return {
        x: ORIGINAL_WIDTH,
        y: ORIGINAL_HEIGHT - 380,
        width: 150 * 1.25,
        height: 150 * 1.25,
        speed: 200,
        frameX: 0,
        frameTimer: 0,
        frameDuration: 1000 / 8,
        caught: false,
        active: false
    };
}

function createCoyote() {
    return {
        x: ORIGINAL_WIDTH,
        y: ORIGINAL_HEIGHT - 330,
        width: 150 * 1.25,
        height: 150 * 1.25,
        speed: 400,
        frameX: 0,
        frameTimer: 0,
        frameDuration: 1000 / 8,
        active: false
    };
}

function createWeed() {
    return {
        x: ORIGINAL_WIDTH,
        y: ORIGINAL_HEIGHT - 330,
        width: 150,
        height: 150,
        speed: 350,
        frameX: 0,
        frameTimer: 0,
        frameDuration: 1000 / 8,
        active: false
    };
}

function createShepherd() {
    return {
        x: ORIGINAL_WIDTH / 2 - 150,
        y: ORIGINAL_HEIGHT - 600,
        width: 300,
        height: 450,
        frameX: 0,
        frameTimer: 0,
        frameDuration: 1000 / 12,
        speed: 200,
        moving: true,
        jumping: false,
        jumpProgress: 0,
        active: true
    };
}

// Initialize game
function init() {
    shepherd = createShepherd();
    console.log("Shepherd initialized:", shepherd);
    
    for (let i = 0; i < SHEEP_POOL_SIZE; i++) {
        sheepPool.push(createSheep());
    }
    
    for (let i = 0; i < COYOTE_POOL_SIZE; i++) {
        coyotePool.push(createCoyote());
    }
    
    for (let i = 0; i < WEED_POOL_SIZE; i++) {
        weedPool.push(createWeed());
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('click', handleCanvasClick);

    lastTime = performance.now();
    startGame();
    gameLoop(lastTime);
}


function handleClick(e) {
    // Check if the shepherd is not already jumping
    if (!shepherd.jumping) {
        shepherd.jumping = true;
        shepherd.jumpProgress = 0;
    }
}

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    scale = Math.min(windowWidth / ORIGINAL_WIDTH, windowHeight / ORIGINAL_HEIGHT);

    canvas.width = ORIGINAL_WIDTH * scale;
    canvas.height = ORIGINAL_HEIGHT * scale;

    canvas.style.marginLeft = `${(windowWidth - canvas.width) / 2}px`;
    canvas.style.marginTop = `${(windowHeight - canvas.height) / 2}px`;

      shepherd.x = (ORIGINAL_WIDTH / 2 - 150) * scale;
    shepherd.y = (ORIGINAL_HEIGHT - 600) * scale;

    sheepPool.forEach(sheep => {
        sheep.y = (ORIGINAL_HEIGHT - 380) * scale;
        sheep.width = (150 * 1.25) * scale;
        sheep.height = (150 * 1.25) * scale;
        sheep.speed = 200 * scale;
    });

    coyotePool.forEach(coyote => {
        coyote.y = (ORIGINAL_HEIGHT - 380) * scale;
        coyote.width = (150 * 1.25) * scale;
        coyote.height = (150 * 1.25) * scale;
        coyote.speed = 250 * scale;
    });
    weedPool.forEach(weed => {
        weed.y = (ORIGINAL_HEIGHT - 380) * scale;
        weed.width = 150 * scale;
        weed.height = 150 * scale;
        weed.speed = 350 * scale;
    });
}

function handleKeyDown(e) {
    if (e.key === ' ' && !shepherd.jumping) {
        shepherd.jumping = true;
        shepherd.jumpProgress = 0;
    }
}

function handleTouch(e) {
    e.preventDefault(); // Prevent default touch behavior

    // Check if the shepherd is not already jumping
    if (!shepherd.jumping) {
        shepherd.jumping = true;
        shepherd.jumpProgress = 0;
    }
}

function startGame() {
    gameStarted = true;
    gameState = 'playing';
    shepherd.moving = true;

    scheduleNextSpawn();
}

function scheduleNextSpawn() {
    const now = Date.now();
    const timeSinceLastSpawn = now - lastSpawnTime;
    
    if (timeSinceLastSpawn >= MIN_SPAWN_INTERVAL) {
        if (Math.random() < spawnChance) {
            spawnRandomEntity();
            lastSpawnTime = now;
            console.log("Spawned entity, new spawn chance:", spawnChance);
        } else {
            console.log("Spawn check failed, current chance:", spawnChance);
        }
    }
    
    setTimeout(scheduleNextSpawn, 100);
}

function spawnRandomEntity() {
    const rand = Math.random();
    if (rand < 0.7) { // 70% chance for sheep
        spawnSheep();
    } else if (rand < 0.85) { // 15% chance for coyote
        spawnCoyote();
    } else { // 15% chance for weed
        spawnWeed();
    }
}

function spawnSheep() {
    const availableSheep = sheepPool.find(sheep => !sheep.active);
    if (availableSheep) {
        availableSheep.x = ORIGINAL_WIDTH * scale;
        availableSheep.y = (ORIGINAL_HEIGHT - 380) * scale;
        availableSheep.caught = false;
        availableSheep.active = true;
    } else {
        console.log("No available sheep in the pool!");
    }
}

function spawnCoyote() {
    const availableCoyote = coyotePool.find(coyote => !coyote.active);
    if (availableCoyote) {
        availableCoyote.x = ORIGINAL_WIDTH * scale;
        availableCoyote.y = (ORIGINAL_HEIGHT - 330) * scale;
        availableCoyote.active = true;
    }
}

function spawnWeed() {
    const availableWeed = weedPool.find(weed => !weed.active);
    if (availableWeed) {
        availableWeed.x = ORIGINAL_WIDTH * scale;
        availableWeed.y = (ORIGINAL_HEIGHT - 330) * scale;
        availableWeed.active = true;
    }
}

function updateGame(currentTime) {
    if (gameState !== 'playing') return;

    deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    handleJump(deltaTime);
    updateSheep(deltaTime);
    updateCoyotes(deltaTime);
    updateWeeds(deltaTime);
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
        if (sheep.active) {
            sheep.x -= sheep.speed * dt;
            
            if (checkCollision(shepherd, sheep) && !shepherd.jumping && !sheep.caught) {
                sheep.caught = true;
                sheepCounter++;
                spawnChance = Math.min(spawnChance + SPAWN_CHANCE_INCREASE, 1);
                if (sheepCounter >= WINNING_SCORE) {
                    endGame('win');
                }
            }
            
            if (sheep.x + sheep.width * scale < 0) {
                sheep.active = false;
                sheep.caught = false;  // Reset caught status
            }
        }
    });
}

function updateCoyotes(dt) {
    coyotePool.forEach(coyote => {
        if (coyote.active) {
            coyote.x -= coyote.speed * dt;
            
            if (checkCollision(shepherd, coyote)) {
                if (!shepherd.jumping) {
                    endGame('lose');
                }
            }
            
            if (coyote.x + coyote.width * scale < 0) {
                coyote.active = false;
            }
        }
    });
}

function updateWeeds(dt) {
    weedPool.forEach(weed => {
        if (weed.active) {
            weed.x -= weed.speed * dt;

            if (checkCollision(shepherd, weed)) {
                if (!shepherd.jumping) {
                    endGame('weed'); // Changed from 'lose' to 'weed'
                }
            }

            if (weed.x + weed.width * scale < 0) {
                weed.active = false;
            }
        }
    });
}

function handleSpriteFrame(dt) {
    // Shepherd animation
    if (shepherd.moving) {
        shepherd.frameTimer += dt * 1000;
        console.log("Shepherd frameTimer:", shepherd.frameTimer, "Frame Duration:", shepherd.frameDuration);
        if (shepherd.frameTimer >= shepherd.frameDuration) {
            shepherd.frameTimer = 0;
            shepherd.frameX = (shepherd.frameX + 1) % 4;
            console.log("Shepherd frameX updated:", shepherd.frameX);
        }
    }

    // Sheep animation
    sheepPool.forEach(sheep => {
        if (sheep.active && !sheep.caught) {
            sheep.frameTimer += dt * 1000;
            if (sheep.frameTimer >= sheep.frameDuration) {
                sheep.frameTimer = 0;
                sheep.frameX = 1 - sheep.frameX;
            }
        }
    });

    // Coyote animation
    coyotePool.forEach(coyote => {
        if (coyote.active) {
            coyote.frameTimer += dt * 1000;
            if (coyote.frameTimer >= coyote.frameDuration) {
                coyote.frameTimer = 0;
                coyote.frameX = 1 - coyote.frameX;
            }
        }
    });

    // Weed animation
    weedPool.forEach(weed => {
        if (weed.active) {
            weed.frameTimer += dt * 1000;
            if (weed.frameTimer >= weed.frameDuration) {
                weed.frameTimer = 0;
                weed.frameX = (weed.frameX + 1) % 4;
            }
        }
    });
}

function checkCollision(shepherd, animal) {
    const shepherdMidX = shepherd.x + (shepherd.width * scale) / 2;
    const animalMidX = animal.x + (animal.width * scale) / 2;
    
    if (animalMidX <= shepherdMidX && animalMidX > shepherdMidX - (animal.speed * deltaTime)) {
        const shepherdMidY = shepherd.y + (shepherd.height * scale) / 2;
        const animalMidY = animal.y + (animal.height * scale) / 2;
        
        const shepherdHalfHeight = (shepherd.height * scale) / 2;
        const animalHalfHeight = (animal.height * scale) / 2;
        
        return Math.abs(shepherdMidY - animalMidY) < (shepherdHalfHeight + animalHalfHeight);
    }
    
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(assets['bg.jpg'], 0, 0, canvas.width, canvas.height);

    if (gameState === 'playing') {
        drawSheep();
        drawCoyotes();
        drawWeeds();
        drawShepherd();
        drawScore();
    } else {
        drawEndScreen();
    }
}

function drawWeeds() {
    weedPool.forEach(weed => {
        if (weed.active) {
            const weedSprite = assets[`weed${weed.frameX + 1}.png`];
            ctx.drawImage(weedSprite, Math.round(weed.x), Math.round(weed.y), weed.width, weed.height);
        }
    });
}
function drawSheep() {
    sheepPool.forEach(sheep => {
        if (sheep.active && !sheep.caught) {
            const sheepSprite = assets[`sheep${sheep.frameX + 1}.png`];
            ctx.drawImage(sheepSprite, Math.round(sheep.x), Math.round(sheep.y), sheep.width, sheep.height);
        }
    });
}

function drawCoyotes() {
    coyotePool.forEach(coyote => {
        if (coyote.active) {
            const coyoteSprite = assets[`coyote${coyote.frameX + 1}.png`];
            ctx.drawImage(coyoteSprite, Math.round(coyote.x), Math.round(coyote.y), coyote.width, coyote.height);
        }
    });
}

function drawShepherd() {
    let sprite;
    if (shepherd.jumping) {
        sprite = assets['jump.png'];
    } else if (shepherd.moving) {
        sprite = assets[`walk${shepherd.frameX + 1}.png`];
    }
    console.log("Drawing shepherd with sprite:", sprite.src);

    ctx.drawImage(sprite, 
        Math.round(shepherd.x), 
        Math.round(shepherd.y), 
        shepherd.width * scale, 
        shepherd.height * scale
    );
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Sheep caught: ${sheepCounter}`, canvas.width - 200, 50);
}

function drawEndScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    const baseFontSize = Math.min(canvas.width / 20, 48);
    ctx.font = `${baseFontSize}px Arial`;

    let message, subMessage;
    if (gameState === 'lost') {
        if (loseReason === 'weed') {
            message = "You got taken out by a tumble weed!";
        } else {
            message = "Oh no! A coyote got you!";
        }
        subMessage = "Click the button below to play again";
    } else {
        message = "You caught all of Masani's sheep!";
        subMessage = "Click the button below to play again";
    }

    let y = canvas.height / 2 - baseFontSize;
    y = wrapText(ctx, message, canvas.width / 2, y, canvas.width * 0.9, baseFontSize * 1.2);

    ctx.font = `${baseFontSize * 0.5}px Arial`;
    y = wrapText(ctx, subMessage, canvas.width / 2, y + baseFontSize, canvas.width * 0.9, baseFontSize * 0.6);

    // Draw restart button
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = canvas.width / 2 - buttonWidth / 2;
    const buttonY = y + baseFontSize;

    ctx.fillStyle = 'green';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    
    ctx.fillStyle = 'white';
    ctx.font = `${baseFontSize * 0.5}px Arial`;
    ctx.fillText('Restart Game', canvas.width / 2, buttonY + buttonHeight / 2 + baseFontSize * 0.2);

    // Store button coordinates for click detection
    restartButton = {x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight};
}

function gameLoop(currentTime) {
    if (gameState === 'playing') {
        updateGame(currentTime);
        const dt = (currentTime - lastTime) / 1000;
        console.log("Calling handleSpriteFrame with delta time:", dt);
        handleSpriteFrame(dt);
        lastTime = currentTime;
    }
    drawGame();
    requestAnimationFrame(gameLoop);
}

function endGame(reason) {
    gameStarted = false;
    gameState = reason === 'win' ? 'won' : 'lost';
    loseReason = reason; // Add this line to store the specific lose reason
    
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

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

canvas.addEventListener('click', handleCanvasClick);

function handleCanvasClick(e) {
    if (gameState !== 'playing' && restartButton) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        if (clickX >= restartButton.x && clickX <= restartButton.x + restartButton.width &&
            clickY >= restartButton.y && clickY <= restartButton.y + restartButton.height) {
            restartGame();
        }
    }
}

function restartGame() {
    // Reset game variables
    sheepCounter = 0;
    spawnChance = 0.1;
    lastSpawnTime = 0;
    gameState = 'playing';
    
    // Reset shepherd
    shepherd = createShepherd();

    // Apply current scale to shepherd's position
    shepherd.x *= scale;
    shepherd.y *= scale;
    
    // Reset entity pools
    sheepPool.forEach(sheep => sheep.active = false);
    coyotePool.forEach(coyote => coyote.active = false);
    weedPool.forEach(weed => weed.active = false);
    
    // Restart spawning
    scheduleNextSpawn();
    
    // Restart game loop
    lastTime = performance.now();
    gameLoop(lastTime);
}

// Game starts here
init();