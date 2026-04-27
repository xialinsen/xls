# 问候功能 Spec

## Why
用户发送了简单的问候“你好”，我们需要在工作区创建一个对应的回应文件，以此作为系统正常工作及交互的基础示例。

## What Changes
- 在根目录下创建一个名为 `hello.md` 的文件，包含友好的中文问候语。

## Impact
- Affected specs: 无
- Affected code: `/workspace/hello.md`

## ADDED Requirements
### Requirement: 响应问候
系统应该在工作区提供一个包含问候内容的文件。

#### Scenario: Success case
- **WHEN** 用户输入“你好”
- **THEN** 系统在根目录生成 `hello.md` 并写入问候语
