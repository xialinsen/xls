# 问候用户 Spec

## Why
用户输入了 `/ralph-loop 你好`，启动了 Ralph Loop 模式并打招呼。我们需要回应用户的问候并建立一个基础的任务流，以展示 Ralph Loop 的工作方式。

## What Changes
- 添加一个简单的问候文档或在控制台输出问候信息。

## Impact
- Affected specs: 无
- Affected code: 无

## ADDED Requirements
### Requirement: 问候功能
系统 SHALL 能够记录或展示一条问候信息，以响应用户的打招呼。

#### Scenario: 成功响应问候
- **WHEN** 用户启动 Ralph Loop 并输入你好
- **THEN** 系统生成一个包含问候信息的简单文件 `greeting.md`
