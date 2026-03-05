const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverElement = document.getElementById('gameOver');
const startScreenElement = document.getElementById('startScreen');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
const tileCount = 20;
canvas.width = gridSize * tileCount;
canvas.height = gridSize * tileCount;

let snake = [];
let food = {};
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let isGameRunning = false;
let isPaused = false;

highScoreElement.textContent = highScore;

const snakeColors = [
    { head: '#00ff88', body: '#00cc6a', name: 'green' },
    { head: '#ff6b6b', body: '#ee5a5a', name: 'red' },
    { head: '#4dabf7', body: '#339af0', name: 'blue' },
    { head: '#ffd43b', body: '#fcc419', name: 'yellow' },
    { head: '#da77f2', body: '#cc5de8', name: 'purple' },
    { head: '#ff922b', body: '#fd7e14', name: 'orange' },
    { head: '#20c997', body: '#12b886', name: 'teal' },
    { head: '#ff6b9d', body: '#f06595', name: 'pink' }
];

const foodColors = [
    { main: '#ff6b6b', shadow: '#ee5a5a', stem: '#8b4513', name: 'apple' },
    { main: '#ffd43b', shadow: '#fcc419', stem: '#5c3d2e', name: 'banana' },
    { main: '#4dabf7', shadow: '#339af0', stem: '#1864ab', name: 'blueberry' },
    { main: '#a9e34b', shadow: '#94d82d', stem: '#5c940d', name: 'lime' },
    { main: '#ff922b', shadow: '#fd7e14', stem: '#d9480f', name: 'orange' },
    { main: '#da77f2', shadow: '#cc5de8', stem: '#862e9c', name: 'grape' },
    { main: '#20c997', shadow: '#12b886', stem: '#087f5b', name: 'mint' },
    { main: '#ff6b9d', shadow: '#f06595', stem: '#c2255c', name: 'strawberry' }
];

let currentSnakeColorIndex = 0;
let currentFoodColorIndex = 0;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    currentSnakeColorIndex = Math.floor(Math.random() * snakeColors.length);
    spawnFood();
    isPaused = false;
}

function spawnFood() {
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    currentFoodColorIndex = Math.floor(Math.random() * foodColors.length);
}

function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#2d2d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    const snakeColor = snakeColors[currentSnakeColorIndex];

    snake.forEach((segment, index) => {
        const gradient = ctx.createRadialGradient(
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            0,
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            gridSize / 2
        );

        if (index === 0) {
            gradient.addColorStop(0, snakeColor.head);
            gradient.addColorStop(1, snakeColor.body);
        } else {
            const alpha = 1 - (index / snake.length) * 0.5;
            const headRgb = hexToRgb(snakeColor.head);
            const bodyRgb = hexToRgb(snakeColor.body);
            gradient.addColorStop(0, `rgba(${headRgb.r}, ${headRgb.g}, ${headRgb.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${bodyRgb.r}, ${bodyRgb.g}, ${bodyRgb.b}, ${alpha})`);
        }

        ctx.fillStyle = gradient;
        ctx.shadowColor = snakeColor.head;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2,
            5
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        if (index === 0) {
            ctx.fillStyle = '#000';
            const eyeOffset = 4;
            const eyeSize = 3;
            let eye1X, eye1Y, eye2X, eye2Y;
            
            if (direction.x === 1) {
                eye1X = segment.x * gridSize + gridSize - 6;
                eye1Y = segment.y * gridSize + 5;
                eye2X = segment.x * gridSize + gridSize - 6;
                eye2Y = segment.y * gridSize + gridSize - 8;
            } else if (direction.x === -1) {
                eye1X = segment.x * gridSize + 3;
                eye1Y = segment.y * gridSize + 5;
                eye2X = segment.x * gridSize + 3;
                eye2Y = segment.y * gridSize + gridSize - 8;
            } else if (direction.y === -1) {
                eye1X = segment.x * gridSize + 5;
                eye1Y = segment.y * gridSize + 3;
                eye2X = segment.x * gridSize + gridSize - 8;
                eye2Y = segment.y * gridSize + 3;
            } else {
                eye1X = segment.x * gridSize + 5;
                eye1Y = segment.y * gridSize + gridSize - 6;
                eye2X = segment.x * gridSize + gridSize - 8;
                eye2Y = segment.y * gridSize + gridSize - 6;
            }
            
            ctx.beginPath();
            ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    const foodColor = foodColors[currentFoodColorIndex];

    const foodGradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        0,
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2
    );
    foodGradient.addColorStop(0, foodColor.main);
    foodGradient.addColorStop(1, foodColor.shadow);

    ctx.fillStyle = foodGradient;
    ctx.shadowColor = foodColor.main;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = foodColor.stem;
    ctx.fillRect(food.x * gridSize + gridSize / 2 - 1, food.y * gridSize + 1, 2, 5);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function update() {
    if (isPaused) return;

    direction = { ...nextDirection };

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        spawnFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    isGameRunning = false;
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

function startGame() {
    initGame();
    startScreenElement.classList.add('hidden');
    gameOverElement.classList.add('hidden');
    isGameRunning = true;
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 100);
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
    if (!isGameRunning && (e.key === ' ' || e.key === 'Enter')) {
        startGame();
        return;
    }

    if (e.key === ' ') {
        e.preventDefault();
        isPaused = !isPaused;
        return;
    }

    if (isPaused) return;

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            e.preventDefault();
            break;
    }
});

initGame();
draw();