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

const standSprite = new Image();
standSprite.src = 'pictures/stand1.png';
const walkSprites = [
    new Image(),
    new Image(),
    new Image()
];
walkSprites[0].src = 'pictures/walk1.png';
walkSprites[1].src = 'pictures/walk2.png';
walkSprites[2].src = 'pictures/walk3.png';
const jumpSprite = new Image();
jumpSprite.src = 'pictures/jump.png';

const bgImage = new Image();
bgImage.src = 'pictures/bg.jpg';

let keys = [];
let frameCount = 0;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    shepherd.moving = true;
    if (e.key === ' ') {
        if (!shepherd.jumping) {
            shepherd.jumping = true;
            shepherd.jumpStartY = shepherd.y;
            shepherd.jumpProgress = 0;
        }
    }
});

window.addEventListener('keyup', (e) => {
    delete keys[e.key];
    shepherd.moving = false;
    if (!keys['ArrowRight'] && !keys['ArrowLeft']) {
        shepherd.moving = false;
    }
});

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleWidth = windowWidth / originalWidth;
    const scaleHeight = windowHeight / originalHeight;
    scale = Math.min(scaleWidth, scaleHeight);

    canvas.width = originalWidth * scale;
    canvas.height = originalHeight * scale;

    shepherd.x = (originalWidth * scale) / 2 - (shepherd.width * scale) / 2;
    shepherd.y = (originalHeight * scale) - (600 * scale); // Adjusted for new starting position
}

function moveShepherd() {
    if (keys['ArrowRight'] || keys['ArrowLeft']) {
        shepherd.moving = true;
    } else {
        shepherd.moving = false;
    }
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
    }
    frameCount++;
}

function handleJump() {
    if (shepherd.jumping) {
        if (shepherd.jumpDirection === 'up') {
            shepherd.y -= (200 * scale) / 30; // Up movement over 30 frames (1.5 seconds)
            shepherd.jumpProgress++;
            if (shepherd.jumpProgress >= 30) {
                shepherd.jumpDirection = 'down';
            }
        } else if (shepherd.jumpDirection === 'down') {
            shepherd.y += (200 * scale) / 30; // Down movement over 30 frames (1.5 seconds)
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
    ctx.drawImage(img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); // Draw background image
    moveShepherd();
    handleJump();
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
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
