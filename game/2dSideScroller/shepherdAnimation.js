// Cache DOM elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Shepherd properties
const shepherd = {
    x: canvas.width / 2 - 75,
    y: canvas.height / 2 - 150,
    width: 150,
    height: 300,
    frameX: 0,  // Current frame index for animation
    frameTimer: 0,  // Timer to control frame updates
    frameDuration: 1000 / 12,  // Duration each frame should be displayed (for 12 frames per second)
};

// Preload assets
const assetSources = [
    'pictures/walk1.png',
    'pictures/walk2.png',
    'pictures/walk3.png',
    'pictures/walk4.png'
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

// Initialize and start the game
function init() {
    requestAnimationFrame(gameLoop);
}

function handleSpriteFrame(dt) {
    shepherd.frameTimer += dt * 1000;
    if (shepherd.frameTimer >= shepherd.frameDuration) {
        shepherd.frameTimer = 0;
        shepherd.frameX = (shepherd.frameX + 1) % 4;  // Cycle through walking frames
    }
}

function drawShepherd() {
    const sprite = assets[`walk${shepherd.frameX + 1}.png`];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, shepherd.x, shepherd.y, shepherd.width, shepherd.height);
}

function gameLoop(currentTime) {
    const dt = currentTime ? (currentTime - (lastTime || currentTime)) / 1000 : 0;
    lastTime = currentTime;

    handleSpriteFrame(dt);
    drawShepherd();

    requestAnimationFrame(gameLoop);
}

let lastTime;
