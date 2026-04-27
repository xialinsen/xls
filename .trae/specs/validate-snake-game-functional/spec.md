# 贪吃蛇功能可用性测试 Spec

## Why
当前仓库包含一个原生 Canvas 贪吃蛇游戏，需要提供可重复、可自动化的方式验证核心玩法与皮肤切换等功能是否“能正常使用”，避免隐藏的配置错误（例如颜色配置不合法）在运行时才暴露。

## What Changes
- 新增一套可在 CI/命令行环境运行的“静态校验 + 轻量冒烟测试”脚本，用于验证游戏关键配置与页面要素一致性
- 修复通过测试所暴露的功能性缺陷（例如皮肤配置中的颜色值不合法导致渲染失败）
- **BREAKING**：无

## Impact
- Affected specs: 游戏主界面、核心玩法、输入控制、皮肤选择、分数/最高分显示
- Affected code: /workspace/game.js, /workspace/index.html, 新增 /workspace/scripts/*（测试脚本）

## ADDED Requirements
### Requirement: 自动化功能校验
系统 SHALL 提供可在无浏览器 UI 的环境中运行的校验命令，用于验证以下内容：
- 页面中声明的皮肤选项与游戏逻辑中的皮肤配置一致
- 每个皮肤配置都包含渲染所需字段，且颜色/rgba 字符串为可解析的合法格式

#### Scenario: Success case
- **WHEN** 在项目根目录执行校验脚本
- **THEN** 脚本以退出码 0 结束并输出通过信息

#### Scenario: Failure case
- **WHEN** 皮肤选项与配置不一致，或存在不合法颜色值/缺失字段
- **THEN** 脚本以非 0 退出码结束，并输出具体失败项（皮肤名、字段名、无效值）

### Requirement: 关键玩法冒烟验证清单
系统 SHALL 提供一个最小手工验证清单，覆盖：
- 开始/重开
- 移动与禁止反向
- 吃到食物增长与加分
- 撞墙/撞到自身结束
- 暂停/继续
- 切换各个皮肤后仍可正常渲染与游戏

#### Scenario: Success case
- **WHEN** 按清单执行手工验证步骤
- **THEN** 每一项均符合预期行为

## MODIFIED Requirements
### Requirement: 皮肤切换
现有“皮肤切换”功能 SHALL 在选择任意皮肤后仍能正常渲染蛇与食物，不因配置错误导致异常或不可见。

## REMOVED Requirements
### Requirement: 无
**Reason**: 不适用
**Migration**: 不适用

