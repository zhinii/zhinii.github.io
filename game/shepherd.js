const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const originalWidth = 1400;
const originalHeight = 933;
let scale = 1;

const shepherd = {
    x: originalWidth / 2 - 150, // Adjust for new size
    y: originalHeight - 600,   // Adjusted for new starting position
    width: 300,  // 3 times bigger
    height: 450, // 3 times bigger
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    jumping: false,
    jumpStartY: 0,
    jumpProgress: 0,
    jumpDirection: 'up'
};

const sheepOriginalWidth = 150 * 1.25;
const sheepOriginalHeight = 150 * 1.25;

const sheepSprites = [
    { img: new Image(), x: originalWidth, y: shepherd.y + 200, width: sheepOriginalWidth, height: sheepOriginalHeight, speed: 5, frameX: 0, caught: false, loaded: false },
    { img: new Image(), x: originalWidth, y: shepherd.y + 200, width: sheepOriginalWidth, height: sheepOriginalHeight, speed: 5, frameX: 0, caught: false, loaded: false }
];
sheepSprites[0].img.src = 'pictures/sheep1.png';
sheepSprites[1].img.src = 'pictures/sheep2.png';

sheepSprites.forEach(sheep => {
    sheep.img.onload = () => {
        sheep.loaded = true;
    };
    sheep.img.onerror = () => {
        console.error(`Failed to load image: ${sheep.img.src}`);
    };
});

const standSprite = new Image();
standSprite.src = 'pictures/stand1.png';
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

const bgImage = new Image();
bgImage.src = 'pictures/bg.jpg';

let frameCount = 0;
let lastTouchTime = 0;
let gameStarted = false;
let sheepCounter = 0;

function startGame() {
    popup.style.display = 'none';
    gameStarted = true;
    shepherd.moving = true;
    setInterval(spawnSheep, 3000); // Random sheep spawn interval
}

window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        if (!shepherd.jumping) {
            shepherd.jumping = true;
            shepherd.jumpStartY = shepherd.y;
            shepherd.jumpProgress = 0;
        }
    }
});

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('touchstart', (e) => {
    const currentTime = new Date().getTime();
    const touchDuration = currentTime - lastTouchTime;
    if (touchDuration < 300) {
        // Double touch detected
        if (!shepherd.jumping) {
            shepherd.jumping = true;
            shepherd.jumpStartY = shepherd.y;
            shepherd.jumpProgress = 0;
        }
    }
    lastTouchTime = currentTime;
});

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleWidth = windowWidth / originalWidth;
    const scaleHeight = windowHeight / originalHeight;
    scale = Math.min(scaleWidth, scaleHeight);

    canvas.width = originalWidth * scale;
    canvas.height = originalHeight * scale;

    const canvasOffsetX = (windowWidth - canvas.width) / 2;
    const canvasOffsetY = (windowHeight - canvas.height) / 2;

    canvas.style.marginLeft = `${canvasOffsetX}px`;
    canvas.style.marginTop = `${canvasOffsetY}px`;

    shepherd.x = (originalWidth / 2 - shepherd.width / 2) * scale;
    shepherd.y = (originalHeight - 600) * scale;

    sheepSprites.forEach(sheep => {
        sheep.y = shepherd.y + 200 * scale; // Adjust y position dynamically
        sheep.width = sheepOriginalWidth * scale; // Adjust width dynamically
        sheep.height = sheepOriginalHeight * scale; // Adjust height dynamically
        sheep.speed = 5 * scale; // Adjust speed dynamically
    });

    console.log(`Resize: canvas(${canvas.width}, ${canvas.height}), shepherd(${shepherd.x}, ${shepherd.y}), scale(${scale})`);
}

function handleSpriteFrame() {
    if (frameCount % 12 === 0) { // Speed up the animation by reducing the modulo value
        if (shepherd.moving) {
            shepherd.frameX++;
            if (shepherd.frameX >= walkSprites.length) {
                shepherd.frameX = 0;
            }
        } else {
            shepherd.frameX = 0;
        }

        // Update sheep walking animation frame
        sheepSprites.forEach(sheep => {
            if (!sheep.caught) {
                sheep.frameX = (sheep.frameX + 1) % 2; // Toggle between sheep1 and sheep2 for walking animation
            }
        });
    }
    frameCount++;
}

function handleJump() {
    if (shepherd.jumping) {
        if (shepherd.jumpDirection === 'up') {
            shepherd.y -= (250 * scale) / 52.5; // Up movement over 52.5 frames (1.75 seconds)
            shepherd.jumpProgress++;
            if (shepherd.jumpProgress >= 52.5) {
                shepherd.jumpDirection = 'down';
            }
        } else if (shepherd.jumpDirection === 'down') {
            shepherd.y += (250 * scale) / 52.5; // Down movement over 52.5 frames (1.75 seconds)
            shepherd.jumpProgress--;
            if (shepherd.jumpProgress <= 0) {
                shepherd.jumping = false;
                shepherd.jumpDirection = 'up';
                shepherd.y = shepherd.jumpStartY;
            }
        }
    }
}

function drawSprite(img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    if (img.complete && img.naturalWidth !== 0) { // Ensure the image is fully loaded
        ctx.drawImage(img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
    }
}

function checkCollision(shepherd, sheep) {
    const shepherdMiddleX = shepherd.x + shepherd.width / 2;
    const shepherdMiddleY = shepherd.y + shepherd.height / 2;
    const sheepLeft = sheep.x;
    const sheepRight = sheep.x + sheep.width;
    const sheepTop = sheep.y;
    const sheepBottom = sheep.y + sheep.height;

    const xOverlap = (shepherdMiddleX > sheepLeft) && (shepherdMiddleX < sheepRight);
    let yOverlap = true; // Default to true when not jumping

    if (shepherd.jumping) {
        yOverlap = (shepherdMiddleY > sheepTop) && (shepherdMiddleY < sheepBottom);
    }

    console.log(`Collision check: shepherd(${shepherdMiddleX}, ${shepherdMiddleY}), sheep(${sheepLeft}, ${sheepTop}, ${sheepRight}, ${sheepBottom}), xOverlap(${xOverlap}), yOverlap(${yOverlap}), jumping(${shepherd.jumping})`);

    return xOverlap && yOverlap;
}

function spawnSheep() {
    const randomSheep = Math.random() > 0.5 ? sheepSprites[0] : sheepSprites[1];
    randomSheep.x = originalWidth;
    randomSheep.y = sheepSprites[0].y; // Use dynamically adjusted y position
    randomSheep.caught = false;
}

function updateSheep() {
    sheepSprites.forEach((sheep) => {
        if (!sheep.caught) {
            sheep.x -= sheep.speed;
            if (checkCollision(shepherd, sheep)) {
                if (!shepherd.jumping) { // Check if the shepherd is not jumping
                    sheep.caught = true;
                    sheepCounter++;
                    console.log(`Sheep caught! Total: ${sheepCounter}`);
                }
            }
            if (sheep.x + sheep.width < 0) {
                sheep.x = originalWidth;
                sheep.y = sheepSprites[0].y; // Use dynamically adjusted y position
                sheep.caught = false;
            }
        }
    });
}

function drawSheep() {
    sheepSprites.forEach((sheep) => {
        if (!sheep.caught && sheep.loaded) {
            const currentSheepSprite = sheep.frameX === 0 ? sheepSprites[0].img : sheepSprites[1].img;
            drawSprite(currentSheepSprite, 0, 0, currentSheepSprite.naturalWidth, currentSheepSprite.naturalHeight, sheep.x, sheep.y, sheep.width, sheep.height);
        }
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Sheep caught: ${sheepCounter}`, canvas.width - 200, 50);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); // Draw background image
    if (gameStarted) {
        handleJump();
        updateSheep();
        drawSheep();
        drawScore(); // Draw the score counter
        if (shepherd.jumping) {
            drawSprite(jumpSprite, 0, 0, jumpSprite.width, jumpSprite.height, shepherd.x, shepherd.y, shepherd.width * scale, shepherd.height * scale);
        } else {
            if (shepherd.moving) {
                drawSprite(walkSprites[shepherd.frameX], 0, 0, walkSprites[shepherd.frameX].width, walkSprites[shepherd.frameX].height, shepherd.x, shepherd.y, shepherd.width * scale, shepherd.height * scale);
            } else {
                drawSprite(standSprite, 0, 0, standSprite.width, standSprite.height, shepherd.x, shepherd.y, shepherd.width * scale, shepherd.height * scale);
            }
        }
        handleSpriteFrame();
    }
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
popup.style.display = 'block';
