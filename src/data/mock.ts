import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染模型',
    summary: '探讨 React 18 中引入的并发特性，包括 Fiber 架构的演进、Transitions API 以及 Suspense 的深度应用。',
    content: `
# 深入理解 React 18 并发渲染模型

React 18 带来了一系列令人兴奋的新特性，其中最核心的莫过于**并发渲染 (Concurrent Rendering)**。这标志着 React 从同步渲染模型正式迈入了异步、可中断的渲染时代。

## 什么是并发渲染？

在 React 18 之前，渲染是一个不可中断的同步过程。一旦开始渲染组件树，React 就会一直执行直到结束。如果组件树非常庞大，这可能会阻塞主线程，导致页面掉帧、输入卡顿。

而在并发模式下，React 可以：
- **中断渲染**：在执行高优先级任务（如用户输入）时，暂停当前的渲染工作。
- **恢复渲染**：高优先级任务处理完成后，继续之前的渲染。
- **放弃渲染**：如果状态再次改变，可以丢弃旧的渲染结果，直接开始新的渲染。

## 核心 API

### 1. startTransition

\`startTransition\` 用于标记非紧急的状态更新。

\`\`\`tsx
import { startTransition } from 'react';

// 紧急更新：输入框的值立即改变
setInputValue(input);

startTransition(() => {
  // 非紧急更新：基于输入值的搜索结果可以稍后显示
  setSearchQuery(input);
});
\`\`\`

### 2. Suspense 的增强

React 18 增强了 Suspense，使其不仅能用于代码分割，还能完美配合并发渲染和数据获取。

> "并发渲染不仅提升了性能，更开启了 React 架构的全新可能性。"
    `,
    tags: ['React', 'Frontend', 'Performance'],
    likes: 1245,
    date: '2023-10-24',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'WebAssembly 与 Rust：构建高性能前端计算引擎',
    summary: '如何使用 Rust 编写 WebAssembly 模块，并将其无缝集成到现代前端应用中，突破浏览器的性能瓶颈。',
    content: `
# WebAssembly 与 Rust

随着前端业务逻辑的日益复杂，JavaScript 在处理密集型计算时常常显得力不从心。**WebAssembly (Wasm)** 的出现为前端性能优化提供了全新的维度。

## 为什么选择 Rust？

Rust 是一门系统级编程语言，具有以下优势：
1. **内存安全**：没有垃圾回收 (GC)，通过所有权机制保证内存安全。
2. **极高的高性能**：性能媲美 C/C++。
3. **出色的 Wasm 支持**：Rust 生态（如 \`wasm-bindgen\`）对 WebAssembly 的支持非常完善。

## 实践示例

下面是一个简单的 Rust 函数，导出给 JavaScript 使用：

\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}
\`\`\`

编译为 Wasm 后，在 JS 中调用：

\`\`\`javascript
import init, { fibonacci } from './pkg/my_wasm_module.js';

async function run() {
  await init();
  console.log(fibonacci(40)); // 瞬间计算完成！
}
run();
\`\`\`
    `,
    tags: ['WebAssembly', 'Rust', 'Performance'],
    likes: 892,
    date: '2023-11-15',
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: '构建赛博朋克风格的 UI 组件库',
    summary: '解析如何使用 Tailwind CSS 和 Framer Motion 打造具有未来感、霓虹发光效果的现代 Web 界面。',
    content: `
# 赛博朋克 UI 探索

在现代 Web 设计中，“科技感”和“赛博朋克”风格越来越受到开发者的青睐。它通常包含深色背景、高对比度的霓虹色彩以及流畅的光影动效。

## 色彩构成

我们的核心调色板：
- **Background**: \`#0A0A0F\` (深邃黑)
- **Primary**: \`#00F0FF\` (荧光蓝)
- **Secondary**: \`#B026FF\` (霓虹紫)

## CSS 魔法

利用 CSS Box Shadow 可以轻松实现发光效果：

\`\`\`css
.neon-btn {
  background: transparent;
  border: 1px solid #00F0FF;
  color: #00F0FF;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5),
              inset 0 0 10px rgba(0, 240, 255, 0.5);
  transition: all 0.3s ease;
}

.neon-btn:hover {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.8),
              inset 0 0 20px rgba(0, 240, 255, 0.8);
  background: rgba(0, 240, 255, 0.1);
}
\`\`\`
    `,
    tags: ['CSS', 'Design', 'Tailwind'],
    likes: 1530,
    date: '2023-12-05',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Node.js 架构演进：从 Monolith 到 Serverless',
    summary: '探讨后端架构的演进路线，以及在云原生时代 Node.js 如何在 Serverless 架构中发挥最大价值。',
    content: `
# Node.js 架构演进

...（文章内容略）...
    `,
    tags: ['Node.js', 'Architecture', 'Serverless'],
    likes: 645,
    date: '2024-01-12',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '1',
    author: 'CyberNinja',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberNinja',
    content: '并发渲染确实解决了很多性能痛点，特别是复杂交互场景下的响应速度提升明显！',
    date: '2023-10-25 14:30',
  },
  {
    id: 'c2',
    articleId: '1',
    author: 'FrontendHacker',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=FrontendHacker',
    content: '想知道配合 Zustand 或者 Redux 使用时有没有什么需要特别注意的边界情况？',
    date: '2023-10-26 09:15',
  },
  {
    id: 'c3',
    articleId: '3',
    author: 'NeonDreamer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonDreamer',
    content: '太酷了！发光按钮的代码我直接抄走啦，感谢博主分享！',
    date: '2023-12-06 20:45',
  }
];

export const availableTags = Array.from(new Set(mockArticles.flatMap(a => a.tags)));
