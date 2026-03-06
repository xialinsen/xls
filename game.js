// ==================== DOM 元素获取 ====================
// 获取游戏画布和绑定上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 获取分数显示元素
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

// 获取游戏界面元素
const gameOverElement = document.getElementById('gameOver');
const startScreenElement = document.getElementById('startScreen');
const finalScoreElement = document.getElementById('finalScore');

// 获取按钮元素
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// ==================== 游戏配置 ====================
<<<<<<< HEAD
const gridSize = 30;      // 每个格子的大小（像素）
const tileCount = 30;     // 格子数量（横向和纵向相同）
=======
const gridSize = 22;      // 每个格子的大小（像素）
const tileCount = 22;     // 格子数量（横向和纵向相同）
>>>>>>> origin/main

// 设置画布尺寸
canvas.width = gridSize * tileCount;   // 画布宽度 = 格子大小 × 格子数量
canvas.height = gridSize * tileCount;  // 画布高度 = 格子大小 × 格子数量

// ==================== 游戏状态变量 ====================
let snake = [];           // 蛇身体数组，存储每个身体段的坐标
let food = {};            // 食物对象，包含食物的坐标
<<<<<<< HEAD
let direction = { x: 1, y: 1 };      // 当前移动方向
let nextDirection = { x: 1, y: 1 };  // 下一步移动方向（用于防止快速按键导致反向移动）
let score = 1;            // 当前分数
=======
let direction = { x: 0, y: 0 };      // 当前移动方向
let nextDirection = { x: 0, y: 0 };  // 下一步移动方向（用于防止快速按键导致反向移动）
let score = 2;            // 当前分数
>>>>>>> origin/main
let highScore = localStorage.getItem('snakeHighScore') || 0;  // 最高分（从本地存储读取）
let gameLoop;             // 游戏循环定时器
let isGameRunning = false; // 游戏是否正在运行
let isPaused = false;      // 游戏是否暂停

// ==================== 皮肤配置 ====================
// 定义多种皮肤主题，每种皮肤包含蛇头、蛇身、食物的颜色配置
const skins = {
    // 经典绿色皮肤
    classic: {
        headColor1: '#00ff88',      // 蛇头渐变起始色
        headColor2: '#00cc6a',      // 蛇头渐变结束色
        bodyColor1: 'rgba(0, 255, 136, ',   // 蛇身渐变起始色（带透明度）
        bodyColor2: 'rgba(0, 204, 106, ',   // 蛇身渐变结束色（带透明度）
        foodColor1: '#ff6b6b',      // 食物渐变起始色
        foodColor2: '#ee5a5a',      // 食物渐变结束色
        glowColor: '#00ff88',       // 蛇身发光颜色
        foodGlow: '#ff6b6b',        // 食物发光颜色
        eyeColor: '#000'            // 蛇眼睛颜色
    },
    // 霓虹紫色皮肤
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
    // 金色皮肤
    golden: {
        headColor1: '#ffd700',
        headColor2: '#ffb700',
        bodyColor1: 'rgba(255, 215, 0, ',
        bodyColor2: 'rgba(255, 183, 0, ',
        foodColor1: '#ff6b6b',
        foodColor2: '#ee5a5a',
        glowColor: '#ffd700',
        foodGlow: '#ff6b6b',
        eyeColor: '#8b4513'         // 金色皮肤使用棕色眼睛
    },
    // 海洋蓝色皮肤
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
    // 火焰皮肤
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
    // 黑客帝国绿色皮肤
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

// 当前使用的皮肤（从本地存储读取，默认为经典皮肤）
let currentSkin = localStorage.getItem('snakeSkin') || 'classic';

// 显示最高分
highScoreElement.textContent = highScore;

// ==================== 游戏初始化函数 ====================
function initGame() {
    // 初始化蛇身体，起始位置在画布中央，长度为3节
    snake = [
        { x: 10, y: 10 },   // 蛇头
        { x: 9, y: 10 },    // 蛇身第一节
        { x: 8, y: 10 }     // 蛇身第二节
    ];
    
    // 设置初始移动方向为向右
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    
    // 重置分数
    score = 0;
    scoreElement.textContent = score;
    
    // 生成食物
    spawnFood();
    
    // 取消暂停状态
    isPaused = false;
}

// ==================== 生成食物函数 ====================
function spawnFood() {
    // 随机生成食物位置，确保不在蛇身上
    do {
        food = {
            x: Math.floor(Math.random() * tileCount),  // 随机x坐标
            y: Math.floor(Math.random() * tileCount)   // 随机y坐标
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));  // 如果食物在蛇身上则重新生成
}

// ==================== 绘制函数 ====================
function draw() {
    // 绘制背景
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制网格线
    ctx.strokeStyle = '#2d2d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        // 绘制垂直线
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        // 绘制水平线
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    // 获取当前皮肤配置
    const skin = skins[currentSkin];
    
    // 绘制蛇
    snake.forEach((segment, index) => {
        // 为每个蛇身段创建径向渐变
        const gradient = ctx.createRadialGradient(
            segment.x * gridSize + gridSize / 2,  // 渐变中心x
            segment.y * gridSize + gridSize / 2,  // 渐变中心y
            0,                                     // 内圆半径
            segment.x * gridSize + gridSize / 2,  // 外圆中心x
            segment.y * gridSize + gridSize / 2,  // 外圆中心y
            gridSize / 2                          // 外圆半径
        );
        
        // 根据是否为蛇头设置不同颜色
        if (index === 0) {
            // 蛇头使用实色渐变
            gradient.addColorStop(0, skin.headColor1);
            gradient.addColorStop(1, skin.headColor2);
        } else {
            // 蛇身使用带透明度的渐变，越靠近尾部越透明
            const alpha = 1 - (index / snake.length) * 0.5;
            gradient.addColorStop(0, `${skin.bodyColor1}${alpha})`);
            gradient.addColorStop(1, `${skin.bodyColor2}${alpha})`);
        }
        
        // 设置填充样式和发光效果
        ctx.fillStyle = gradient;
        ctx.shadowColor = skin.glowColor;
        ctx.shadowBlur = 10;
        
        // 绘制圆角矩形蛇身段
        ctx.beginPath();
        ctx.roundRect(
            segment.x * gridSize + 1,  // x坐标（留1像素边距）
            segment.y * gridSize + 1,  // y坐标（留1像素边距）
            gridSize - 2,              // 宽度（减去边距）
            gridSize - 2,              // 高度（减去边距）
            5                          // 圆角半径
        );
        ctx.fill();
        ctx.shadowBlur = 0;  // 重置发光效果

        // 为蛇头绘制眼睛
        if (index === 0) {
            ctx.fillStyle = skin.eyeColor;
            const eyeOffset = 4;
            const eyeSize = 3;
            let eye1X, eye1Y, eye2X, eye2Y;
            
            // 根据移动方向确定眼睛位置
            if (direction.x === 1) {
                // 向右移动：眼睛在右侧
                eye1X = segment.x * gridSize + gridSize - 6;
                eye1Y = segment.y * gridSize + 5;
                eye2X = segment.x * gridSize + gridSize - 6;
                eye2Y = segment.y * gridSize + gridSize - 8;
            } else if (direction.x === -1) {
                // 向左移动：眼睛在左侧
                eye1X = segment.x * gridSize + 3;
                eye1Y = segment.y * gridSize + 5;
                eye2X = segment.x * gridSize + 3;
                eye2Y = segment.y * gridSize + gridSize - 8;
            } else if (direction.y === -1) {
                // 向上移动：眼睛在上方
                eye1X = segment.x * gridSize + 5;
                eye1Y = segment.y * gridSize + 3;
                eye2X = segment.x * gridSize + gridSize - 8;
                eye2Y = segment.y * gridSize + 3;
            } else {
                // 向下移动：眼睛在下方
                eye1X = segment.x * gridSize + 5;
                eye1Y = segment.y * gridSize + gridSize - 6;
                eye2X = segment.x * gridSize + gridSize - 8;
                eye2Y = segment.y * gridSize + gridSize - 6;
            }
            
            // 绘制两只眼睛
            ctx.beginPath();
            ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // 绘制食物
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
    
    // 设置食物样式和发光效果
    ctx.fillStyle = foodGradient;
    ctx.shadowColor = skin.foodGlow;
    ctx.shadowBlur = 15;
    
    // 绘制圆形食物
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,  // 圆心x
        food.y * gridSize + gridSize / 2,  // 圆心y
        gridSize / 2 - 2,                  // 半径
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // 绘制食物的茎（装饰效果）
    ctx.fillStyle = skin.foodGlow === '#ff6b6b' ? '#8b4513' : skin.foodColor2;
    ctx.fillRect(food.x * gridSize + gridSize / 2 - 1, food.y * gridSize + 1, 2, 5);
}

// ==================== 游戏更新函数 ====================
function update() {
    // 如果游戏暂停则不更新
    if (isPaused) return;

    // 更新当前方向
    direction = { ...nextDirection };

    // 计算新的蛇头位置
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // 检测是否撞墙
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // 检测是否撞到自己
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // 将新头部添加到蛇身前端
    snake.unshift(head);

    // 检测是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;                    // 增加分数
        scoreElement.textContent = score;
        spawnFood();                    // 生成新食物
    } else {
        snake.pop();                    // 如果没吃到食物则移除尾部，保持长度不变
    }
}

// ==================== 游戏结束函数 ====================
function gameOver() {
    isGameRunning = false;
    clearInterval(gameLoop);  // 停止游戏循环
    
    // 检查是否刷新最高分
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);  // 保存最高分到本地存储
        highScoreElement.textContent = highScore;
    }
    
    // 显示游戏结束界面
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// ==================== 开始游戏函数 ====================
function startGame() {
    initGame();  // 初始化游戏状态
    
    // 隐藏开始和结束界面
    startScreenElement.classList.add('hidden');
    gameOverElement.classList.add('hidden');
    
    isGameRunning = true;
    
    // 启动游戏循环，每100毫秒更新一次
    gameLoop = setInterval(() => {
        update();
        draw();
    }, 100);
}

// ==================== 事件监听器 ====================
// 开始按钮点击事件
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// 皮肤选择事件
const skinOptions = document.querySelectorAll('.skin-option');
skinOptions.forEach(option => {
    option.addEventListener('click', () => {
        // 移除所有皮肤的激活状态
        skinOptions.forEach(opt => opt.classList.remove('active'));
        // 激活当前选择的皮肤
        option.classList.add('active');
        // 更新当前皮肤
        currentSkin = option.dataset.skin;
        // 保存皮肤选择到本地存储
        localStorage.setItem('snakeSkin', currentSkin);
        // 重新绘制画面
        draw();
    });
});

// 初始化皮肤选择状态
const savedSkin = localStorage.getItem('snakeSkin') || 'classic';
skinOptions.forEach(option => {
    skinOptions.forEach(opt => opt.classList.remove('active'));
    if (option.dataset.skin === savedSkin) {
        option.classList.add('active');
    }
});

// 键盘事件监听
document.addEventListener('keydown', (e) => {
    // 如果游戏未运行，按空格或回车开始游戏
    if (!isGameRunning && (e.key === ' ' || e.key === 'Enter')) {
        startGame();
        return;
    }

    // 空格键暂停/继续游戏
    if (e.key === ' ') {
        e.preventDefault();
        isPaused = !isPaused;
        return;
    }

    // 如果游戏暂停则不处理方向键
    if (isPaused) return;

    // 方向键控制（防止反向移动）
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            // 只有当前不是向下移动时才能向上
            if (direction.y !== 1) {
                nextDirection = { x: 0, y: -1 };
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            // 只有当前不是向上移动时才能向下
            if (direction.y !== -1) {
                nextDirection = { x: 0, y: 1 };
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            // 只有当前不是向右移动时才能向左
            if (direction.x !== 1) {
                nextDirection = { x: -1, y: 0 };
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            // 只有当前不是向左移动时才能向右
            if (direction.x !== -1) {
                nextDirection = { x: 1, y: 0 };
            }
            e.preventDefault();
            break;
    }
});

// ==================== 初始化 ====================
// 页面加载时初始化游戏并绘制初始画面
initGame();
draw();
