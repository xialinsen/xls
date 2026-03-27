import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '构建未来：Web3与元宇宙的架构探索',
    summary: '深入解析Web3的核心技术栈，从智能合约到去中心化存储，探索下一代互联网的基础设施构建指南。',
    content: `## 引言

Web3 不仅仅是一个流行词，它代表了互联网架构的范式转变。在这篇文章中，我们将深入探讨支撑 Web3 的核心技术。

### 智能合约的基础

智能合约是部署在区块链上的自执行程序。它们通过加密技术确保了代码的不可篡改和透明执行。

\`\`\`solidity
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting = "Hello, Web3!";
}
\`\`\`

### 去中心化存储

与传统的中心化服务器不同，IPFS (InterPlanetary File System) 和 Arweave 提供了基于内容寻址的存储方案。这确保了数据的永久性和抗审查性。

### 结语

未来的互联网将是去中心化、透明且由用户主导的。作为开发者，掌握这些技术将使我们在新时代的浪潮中占据先机。`,
    likes: 1250,
    tags: ['Web3', 'Blockchain', 'Architecture'],
    date: '2023-10-24',
    readTime: '8 min read',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=futuristic%20blockchain%20network%20glowing%20nodes%20dark%20background%20cyberpunk&image_size=landscape_16_9'
  },
  {
    id: '2',
    title: 'React 18 并发渲染深度解析',
    summary: '全面剖析 React 18 的 Concurrent Mode，带你理解 Suspense、useTransition 等新特性背后的设计哲学。',
    content: `## React 18 的新纪元

React 18 引入了并发渲染 (Concurrent Rendering)，这是 React 核心架构的一次重大升级。

### 什么是并发渲染？

在 React 18 之前，渲染是一个不可中断的过程。一旦开始渲染，主线程就会被阻塞，直到渲染完成。而并发渲染允许 React 暂停、恢复甚至放弃渲染任务。

### useTransition 的魔力

\`useTransition\` 允许我们将某些状态更新标记为"非紧急"。这在处理繁重的计算或数据获取时特别有用。

\`\`\`tsx
import { useState, useTransition } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    // 紧急更新：更新输入框的值
    const value = e.target.value;
    
    // 非紧急更新：触发搜索
    startTransition(() => {
      setQuery(value);
    });
  };

  return <input onChange={handleChange} />;
}
\`\`\`

掌握并发渲染将极大地提升你的 React 应用的性能和用户体验。`,
    likes: 892,
    tags: ['React', 'Frontend', 'Performance'],
    date: '2023-11-05',
    readTime: '6 min read',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20react%20logo%20glowing%20neon%20blue%20dark%20tech%20background&image_size=landscape_16_9'
  },
  {
    id: '3',
    title: '赛博朋克美学在现代UI设计中的应用',
    summary: '探讨如何将霓虹色彩、故障艺术和深色主题融入现代Web界面设计，打造极具视觉冲击力的科技感体验。',
    content: `## 科技感与设计的碰撞

在现代 Web 设计中，"科技感"和"赛博朋克"风格越来越受到开发者的青睐。它不仅能抓住用户的眼球，还能传达出前卫的品牌形象。

### 核心元素

1.  **深色背景**：通常使用极致的黑色或深蓝色作为主色调。
2.  **霓虹色彩**：高饱和度的青色、品红色和荧光绿是点睛之笔。
3.  **毛玻璃效果 (Glassmorphism)**：半透明的材质增加层次感。

### CSS 实现技巧

利用 CSS 的 \`box-shadow\` 和 \`text-shadow\` 可以轻松实现发光效果。

\`\`\`css
.neon-text {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #0fa,
    0 0 40px #0fa,
    0 0 80px #0fa;
}
\`\`\`

结合现代的 CSS 框架如 Tailwind CSS，我们可以更快速地构建出这种风格的界面。`,
    likes: 2105,
    tags: ['Design', 'CSS', 'Cyberpunk'],
    date: '2023-11-12',
    readTime: '5 min read',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20cityscape%20neon%20lights%20dark%20ui%20elements%20glowing&image_size=landscape_16_9'
  },
  {
    id: '4',
    title: 'Rust 与 WebAssembly：重塑前端性能边界',
    summary: '为何 Rust 成为编写 WebAssembly 的首选语言？本文将通过实际案例展示如何将密集型计算转移到 Wasm 中执行。',
    content: `## 突破 JavaScript 的极限

随着 Web 应用变得越来越复杂，JavaScript 在处理密集型计算时显得力不从心。WebAssembly (Wasm) 的出现为我们提供了一种新的解决方案。

### 为什么选择 Rust？

Rust 拥有极高的性能、内存安全保证，并且没有垃圾回收器 (GC) 带来的停顿。这使得它成为编译到 Wasm 的理想选择。

### 一个简单的示例

让我们来看一个使用 Rust 编写并编译为 Wasm 的简单函数：

\`\`\`rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}
\`\`\`

通过将其集成到前端应用中，我们可以显著提升复杂计算任务的执行速度。`,
    likes: 645,
    tags: ['Rust', 'WebAssembly', 'Performance'],
    date: '2023-11-20',
    readTime: '10 min read',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=rust%20programming%20language%20gear%20glowing%20orange%20dark%20tech%20circuit&image_size=landscape_16_9'
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    articleId: '3',
    author: 'DesignGeek',
    content: '这篇文章太棒了！我特别喜欢发光效果的 CSS 实现技巧，已经在我的个人主页上用起来了。',
    date: '2023-11-13T10:30:00Z'
  },
  {
    id: '2',
    articleId: '3',
    author: 'CyberCoder',
    content: '如果能加上一些故障艺术(Glitch Art)的代码示例就更完美了。',
    date: '2023-11-14T14:15:00Z'
  },
  {
    id: '3',
    articleId: '1',
    author: 'CryptoEnthusiast',
    content: '非常清晰的基础介绍，期待关于智能合约安全性的后续文章！',
    date: '2023-10-25T09:20:00Z'
  }
];
