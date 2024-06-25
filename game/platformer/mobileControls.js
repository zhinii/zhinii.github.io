// mobileControls.js

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

    leftBtn.addEventListener('touchstart', () => { leftPressed = true; });
    leftBtn.addEventListener('touchend', () => { leftPressed = false; });

    rightBtn.addEventListener('touchstart', () => { rightPressed = true; });
    rightBtn.addEventListener('touchend', () => { rightPressed = false; });

    function jump() {
        jumpCallback();
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

// Export the functions and variables we want to make available
export { setupMobileControls, leftPressed, rightPressed };