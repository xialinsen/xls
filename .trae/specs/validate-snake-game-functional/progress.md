## Round 1

- 完成无依赖自动化校验脚本 scripts/validate-snake-game.mjs，用于校验皮肤 key 一致性、字段完整性与颜色格式合法性
- 修复 game.js 中多个皮肤的无效颜色配置，使皮肤切换渲染可用
- 运行 node scripts/validate-snake-game.mjs 通过；启动本地静态服务并用浏览器脚本验证开始/移动/暂停/吃食物/碰撞结束/重开/皮肤切换
- 文件变更：/workspace/scripts/validate-snake-game.mjs，/workspace/game.js，/workspace/.trae/specs/validate-snake-game-functional/*
