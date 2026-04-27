# Tasks
- [x] Task 1: 盘点并定义“功能正常”的验证范围
  - [x] SubTask 1.1: 基于现有 PRD/页面，列出需要覆盖的核心功能点（开始/重开、移动、加分、碰撞、暂停、皮肤）
  - [x] SubTask 1.2: 明确哪些项可自动化校验、哪些项以手工清单方式校验

- [x] Task 2: 实现自动化校验脚本（无依赖）
  - [x] SubTask 2.1: 新增 scripts/validate-snake-game.mjs，解析 index.html 提取 data-skin 列表
  - [x] SubTask 2.2: 解析 game.js 提取 skins 对象键集合（以保守的文本/正则方式，避免执行 DOM 代码）
  - [x] SubTask 2.3: 校验 skin key 集合一致
  - [x] SubTask 2.4: 校验每个皮肤字段完整性（headColor1/headColor2/bodyColor1/bodyColor2/foodColor1/foodColor2/glowColor/foodGlow/eyeColor）
  - [x] SubTask 2.5: 校验颜色格式（#RGB/#RRGGBB/rgba(r,g,b, 以及与 alpha 拼接兼容的 rgba 前缀)）
  - [x] SubTask 2.6: 约定输出格式与退出码（0 通过，非 0 失败）

- [x] Task 3: 修复校验暴露的缺陷，使功能可正常使用
  - [x] SubTask 3.1: 修复 game.js 中不合法的颜色/rgba 配置
  - [x] SubTask 3.2: 复跑校验脚本并确保通过

- [x] Task 4: 增补最小手工冒烟测试清单
  - [x] SubTask 4.1: 在 checklist.md 中加入可逐项勾选的手工验证步骤（以最终用户可操作描述为准）

- [x] Task 5: 验证与收尾
  - [x] SubTask 5.1: 执行 node scripts/validate-snake-game.mjs
  - [x] SubTask 5.2: 启动本地静态服务进行手工验证（仅用于验证，不引入依赖）

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 5 depends on Task 3, Task 4
