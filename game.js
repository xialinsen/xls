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
let direction = { x: 0, y: 1 };
let nextDirection = { x: 0, y: 1 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let isGameRunning = false;
let isPaused = false;

const skins = {
    classic: {
        headColor1: '#00ff88',
        headColor2: '#00cc6a',
        bodyColor1: 'rgba(0, 255, 136, ',
        bodyColor2: 'rgba(0, 204, 106, ',
        foodColor1: '#ff6b6b',
        foodColor2: '#ee5a5a',
        glowColor: '#00ff88',
        foodGlow: '#ff6b6b',
        eyeColor: '#000'
    },
    neon: {
        headColor1: '#ff00ff',
        headColor2: '#cc00cc',
        bodyColor1: 'rgba(255, 0, 255, ',
        bodyColor2: 'rgba(204, 0, 204, ',
        foodColor1: '#00ffff',
        foodColor2: '#00cccc',
        glowColor: '#ff00ff',
        foodGlow: '#00ffff',
        eyeColor: '#000'
    },
    golden: {
        headColor1: '#ffd700',
        headColor2: '#ffb700',
        bodyColor1: 'rgba(255, 215, 0, ',
        bodyColor2: 'rgba(255, 183, 0, ',
        foodColor1: '#ff6b6b',
        foodColor2: '#ee5a5a',
        glowColor: '#ffd700',
        foodGlow: '#ff6b6b',
        eyeColor: '#8b4513'
    },
    ocean: {
        headColor1: '#00bfff',
        headColor2: '#0080ff',
        bodyColor1: 'rgba(0, 191, 255, ',
        bodyColor2: 'rgba(0, 128, 255, ',
        foodColor1: '#ff8c00',
        foodColor2: '#ff6b00',
        glowColor: '#00bfff',
        foodGlow: '#ff8c00',
        eyeColor: '#000'
    },
    fire: {
        headColor1: '#ff4500',
        headColor2: '#ff8c00',
        bodyColor1: 'rgba(255, 69, 0, ',
        bodyColor2: 'rgba(255, 140, 0, ',
        foodColor1: '#ffff00',
        foodColor2: '#ffcc00',
        glowColor: '#ff4500',
        foodGlow: '#ffff00',
        eyeColor: '#000'
    },
    matrix: {
        headColor1: '#00ff00',
        headColor2: '#00cc00',
        bodyColor1: 'rgba(0, 255, 0, ',
        bodyColor2: 'rgba(0, 204, 0, ',
        foodColor1: '#ff0000',
        foodColor2: '#cc0000',
        glowColor: '#00ff00',
        foodGlow: '#ff0000',
        eyeColor: '#000'
    }
};

let currentSkin = localStorage.getItem('snakeSkin') || 'classic';

highScoreElement.textContent = highScore;

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

    const skin = skins[currentSkin];
    
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
            gradient.addColorStop(0, skin.headColor1);
            gradient.addColorStop(1, skin.headColor2);
        } else {
            const alpha = 1 - (index / snake.length) * 0.5;
            gradient.addColorStop(0, `${skin.bodyColor1}${alpha})`);
            gradient.addColorStop(1, `${skin.bodyColor2}${alpha})`);
        }
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = skin.glowColor;
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
            ctx.fillStyle = skin.eyeColor;
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

    const foodGradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        0,
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2
    );
    foodGradient.addColorStop(0, skin.foodColor1);
    foodGradient.addColorStop(1, skin.foodColor2);
    
    ctx.fillStyle = foodGradient;
    ctx.shadowColor = skin.foodGlow;
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

    ctx.fillStyle = skin.foodGlow === '#ff6b6b' ? '#8b4513' : skin.foodColor2;
    ctx.fillRect(food.x * gridSize + gridSize / 2 - 1, food.y * gridSize + 1, 2, 5);
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

const skinOptions = document.querySelectorAll('.skin-option');
skinOptions.forEach(option => {
    option.addEventListener('click', () => {
        skinOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        currentSkin = option.dataset.skin;
        localStorage.setItem('snakeSkin', currentSkin);
        draw();
    });
});

const savedSkin = localStorage.getItem('snakeSkin') || 'classic';
skinOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.skin === savedSkin) {
        option.classList.add('active');
    }
});

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
