# 冒泡排序实现 Spec

## Why
需要一个可复用的冒泡排序示例，便于在当前仓库中演示排序算法与用于后续练习/调试。

## What Changes
- 新增一个独立的冒泡排序实现模块，导出 `bubbleSort` 方法
- 提供最小可运行的示例调用入口（不影响现有页面/游戏逻辑）

## Impact
- Affected specs: 算法示例、可复用工具函数
- Affected code: 新增文件 `bubbleSort.js`、新增简单验证脚本或测试文件

## ADDED Requirements
### Requirement: Bubble Sort Function
系统 SHALL 提供 `bubbleSort(input, compare?)`，对输入数组进行排序并返回排序后的新数组（默认升序）。

#### Scenario: Success case
- **WHEN** 调用 `bubbleSort([3, 1, 2])`
- **THEN** 返回 `[1, 2, 3]`
- **AND** 原数组不被修改

#### Scenario: Custom comparator
- **WHEN** 调用 `bubbleSort([{n:2},{n:1}], (a,b)=>a.n-b.n)`
- **THEN** 返回 `[{n:1},{n:2}]`

## MODIFIED Requirements
### Requirement: Existing Feature
无

## REMOVED Requirements
### Requirement: Old Feature
无
