# 响应问候 Spec

## Why
用户发送了问候语“你好”，系统需要以友好的方式回应用户，并确认已准备好接收新的开发任务。

## What Changes
- 在工作区创建一个名为 `response.md` 的文件，记录对用户的回复。

## Impact
- Affected specs: 无
- Affected code: 无

## ADDED Requirements
### Requirement: 回应问候
系统应当友好地回应用户的问候，并提示用户可以开始输入开发需求。

#### Scenario: Success case
- **WHEN** 用户输入问候语
- **THEN** 系统生成包含问候回复的 Markdown 文件，并准备好进入下一个任务。
