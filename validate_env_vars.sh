#!/bin/bash
# 文件名：validate_env_vars.sh
# 功能：一站式验证环境变量、敏感变量、Shell 配置、Node.js 版本

# ==================== 第一步：初始化环境（解决package.json缺失问题）====================
echo -e "\033[34m===== 1. 初始化项目环境 =====\033[0m"
cd /workspace || { echo -e "\033[31m/workspace 目录不存在，退出！\033[0m"; exit 1; }

# 检查并创建 package.json（避免npm install报错）
if [ ! -f package.json ]; then
  echo "正在创建 package.json..."
  npm init -y > /dev/null 2>&1
  # 写入启动脚本
  sed -i 's/"scripts": {}/"scripts": {"start": "node server.js"}/' package.json
  echo "package.json 创建完成！"
else
  echo "package.json 已存在，跳过创建"
fi

# 检查并创建 server.js（变量验证核心文件）
if [ ! -f server.js ]; then
  echo "正在创建 server.js 验证文件..."
  cat > server.js << 'EOF'
const http = require('http');
// 读取普通环境变量
const ENV = process.env.ENV || '未配置';
const GAME_TITLE = process.env.GAME_TITLE || '未配置';
const GRID_SIZE = process.env.GRID_SIZE || '未配置';
const INITIAL_SPEED = process.env.INITIAL_SPEED || '未配置';
// 读取敏感变量（仅验证存在性，不输出明文）
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// 启动HTTP服务验证变量
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>环境变量验证结果</h1>
    <h3>普通环境变量：</h3>
    <ul>
      <li>ENV: ${ENV}</li>
      <li>GAME_TITLE: ${GAME_TITLE}</li>
      <li>GRID_SIZE: ${GRID_SIZE}</li>
      <li>INITIAL_SPEED: ${INITIAL_SPEED}</li>
    </ul>
    <h3>敏感变量（仅验证存在性）：</h3>
    <ul>
      <li>API_KEY 存在: ${!!API_KEY}</li>
      <li>DB_PASSWORD 存在: ${!!DB_PASSWORD}</li>
      <li>ADMIN_TOKEN 存在: ${!!ADMIN_TOKEN}</li>
    </ul>
  `);
}).listen(3000, () => {
  console.log("✅ 验证服务启动成功：http://localhost:3000");
});
EOF
  echo "server.js 创建完成！"
else
  echo "server.js 已存在，跳过创建"
fi

# ==================== 第二步：基础环境验证 ====================
echo -e "\n\033[34m===== 2. 基础环境验证 =====\033[0m"

# 验证Node.js版本
echo -n "Node.js 版本："
NODE_VERSION=$(node -v)
echo $NODE_VERSION
if [[ $NODE_VERSION == v24* ]]; then
  echo -e "\033[32m✓ Node.js 版本符合要求（24.x）\033[0m"
else
  echo -e "\033[31m✗ Node.js 版本不符合，当前为 $NODE_VERSION\033[0m"
fi

# 验证Default Shell配置
echo -n "当前Shell："
SHELL_PATH=$SHELL
echo $SHELL_PATH
if [[ $SHELL_PATH == *bash* ]]; then
  echo -e "\033[32m✓ Shell 配置符合要求（bash）\033[0m"
else
  echo -e "\033[33m⚠️  Shell 不是bash，当前为 $SHELL_PATH\033[0m"
fi

# ==================== 第三步：环境变量验证 ====================
echo -e "\n\033[34m===== 3. 环境变量验证（终端层面） =====\033[0m"

# 定义需要验证的普通变量列表
NORMAL_VARS=("ENV" "GAME_TITLE" "GRID_SIZE" "INITIAL_SPEED")
for var in "${NORMAL_VARS[@]}"; do
  value=${!var}
  echo -n "$var："
  if [ -n "$value" ]; then
    echo -e "\033[32m$value\033[0m"
  else
    echo -e "\033[31m未配置\033[0m"
  fi
done

# 定义需要验证的敏感变量列表（仅验证存在性）
SENSITIVE_VARS=("API_KEY" "DB_PASSWORD" "ADMIN_TOKEN")
echo -e "\n敏感变量验证（仅检查是否存在）："
for var in "${SENSITIVE_VARS[@]}"; do
  value=${!var}
  echo -n "$var 存在："
  if [ -n "$value" ]; then
    echo -e "\033[32m是\033[0m"
    # 额外验证：敏感变量是否脱敏（终端不输出明文）
    echo -n "$var 终端展示："
    if [[ ${#value} -gt 0 && "$value" != "******" ]]; then
      echo -e "\033[33m⚠️  明文展示（长度：${#value}）\033[0m"
    else
      echo -e "\033[32m已脱敏\033[0m"
    fi
  else
    echo -e "\033[31m否\033[0m"
  fi
done

# ==================== 第四步：启动服务验证 ====================
echo -e "\n\033[34m===== 4. 启动服务验证（浏览器层面） =====\033[0m"

# 先停止可能已运行的服务
pkill node > /dev/null 2>&1
echo "正在启动验证服务..."
npm start > /dev/null 2>&1 &
sleep 2 # 等待服务启动

# 检查服务是否启动
if curl -s http://localhost:3000 > /dev/null; then
  echo -e "\033[32m✓ 验证服务已启动，访问 http://localhost:3000 查看完整结果\033[0m"
else
  echo -e "\033[31m✗ 验证服务启动失败\033[0m"
fi

# ==================== 最终提示 ====================
echo -e "\n\033[34m===== 验证完成 =====\033[0m"
echo "1. 终端验证结果已展示 above"
echo "2. 浏览器访问 http://localhost:3000 查看可视化结果"
echo "3. 敏感变量仅验证存在性，未泄露任何明文"

