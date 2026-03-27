import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染机制',
    summary: '本文详细解析了 React 18 的 Concurrent Mode 原理，以及它如何通过时间切片提升前端应用的响应性能。',
    content: `
# 深入理解 React 18 并发渲染机制

React 18 引入了一项革命性的更新：**并发渲染 (Concurrent Rendering)**。这不仅是一个新功能，更是 React 底层架构的一次大换血。

## 什么是并发渲染？

在 React 18 之前，React 的渲染是同步的。一旦开始渲染，就无法被中断。如果组件树非常庞大，浏览器主线程就会被长时间阻塞，导致用户输入卡顿，动画掉帧。

并发渲染的核心理念是**可中断的渲染**。React 现在可以将渲染工作拆分成多个小任务（时间切片），并在执行这些任务的间隙交出控制权给浏览器，让浏览器有机会处理更高优先级的任务，例如用户输入、动画更新等。

## 核心特性

1.  **时间切片 (Time Slicing)**：React 将长任务切分为多个短任务。
2.  **更新优先级**：不同的更新会被赋予不同的优先级。例如，用户的键盘输入拥有最高优先级，应该被立即响应；而后台数据的请求更新则可以被延后。

## 常用 API 体验

\`\`\`tsx
import { useTransition, useState } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

通过 \`useTransition\`，我们可以标记哪些状态更新是非紧急的。

## 总结

并发渲染使得构建高性能、高响应性的前端应用变得更加容易。它是 React 未来发展的重要基石。
    `,
    author: 'Cyber_Ninja',
    date: '2023-10-24',
    likes: 342,
    tags: ['React', '前端', '性能优化'],
  },
  {
    id: '2',
    title: '构建赛博朋克风格的 UI 组件库',
    summary: '从颜色科学到 CSS 动画，一步步教你如何用 Tailwind CSS 打造具有未来科技感的 Web 界面。',
    content: `
# 构建赛博朋克风格的 UI 组件库

赛博朋克 (Cyberpunk) 风格以其强烈的视觉冲击力、高对比度的霓虹色彩以及复杂的机械感，在数字艺术和网页设计中占据了一席之地。

## 颜色搭配

赛博朋克风格的核心在于**暗色背景**与**高亮霓虹色**的对比。

*   **背景**：深灰、深蓝、纯黑（如 \`#0a0a0a\`, \`#111827\`）
*   **霓虹主色**：青色/湖蓝 (\`#00f0ff\`)
*   **霓虹辅色**：洋红/紫 (\`#ff00ff\`, \`#8a2be2\`)
*   **点缀色**：明黄 (\`#fce205\`)

## CSS 发光效果

发光是赛博朋克 UI 的灵魂。我们可以通过 \`box-shadow\` 和 \`text-shadow\` 来实现。

\`\`\`css
.neon-button {
  background: transparent;
  color: #00f0ff;
  border: 2px solid #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5), 
              inset 0 0 10px rgba(0, 240, 255, 0.5);
  transition: all 0.3s ease;
}

.neon-button:hover {
  background: #00f0ff;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.8), 
              0 0 40px rgba(0, 240, 255, 0.6);
}
\`\`\`

## 故障艺术 (Glitch Effect)

故障艺术能够极大地增强科技感。可以使用 CSS 动画的 \`clip-path\` 或者 SVG 滤镜来实现文字或图像的瞬间错位。

## 结语

设计赛博朋克界面不仅仅是堆砌霓虹色，更需要注重细节的打磨，如网格背景、扫描线、等宽字体等，才能营造出沉浸式的未来体验。
    `,
    author: 'Neon_Dreamer',
    date: '2023-11-05',
    likes: 512,
    tags: ['CSS', '设计', 'Tailwind'],
  },
  {
    id: '3',
    title: 'Rust 语言入门：为什么它能成为系统编程的新宠？',
    summary: '探讨 Rust 的所有权机制、内存安全特性以及它在现代 WebAssembly 和云原生开发中的应用。',
    content: `
# Rust 语言入门：系统编程的新宠

近年来，Rust 语言在开发者社区中获得了极高的关注度，并连续多年被评为“最受喜爱的编程语言”。

## 解决痛点：内存安全

C/C++ 赋予了开发者极大的权力，但也带来了极高的风险：内存泄漏、悬垂指针、数据竞争等问题层出不穷。

Rust 通过引入**所有权 (Ownership)** 系统，在编译期静态检查内存安全性，无需垃圾回收器 (GC)，从而在保证安全的同时实现了极致的性能。

## 所有权规则

1.  Rust 中的每一个值都有一个被称为其**所有者 (owner)** 的变量。
2.  值在任一时刻有且只有一个所有者。
3.  当所有者（变量）离开作用域，这个值将被丢弃。

## Hello World

\`\`\`rust
fn main() {
    let mut message = String::from("Hello");
    message.push_str(", Cyber World!");
    println!("{}", message);
}
\`\`\`

## 总结

Rust 学习曲线陡峭，但跨过门槛后，它将赋予你编写高性能、高可靠性系统的超能力。
    `,
    author: 'System_Hacker',
    date: '2023-12-12',
    likes: 288,
    tags: ['Rust', '后端', 'WebAssembly'],
  },
  {
    id: '4',
    title: '大型语言模型 (LLM) 架构解析',
    summary: '简述 Transformer 模型原理，以及 ChatGPT 等大型语言模型是如何被训练出来的。',
    content: `
# 大型语言模型 (LLM) 架构解析

AI 浪潮席卷全球，而其背后的核心驱动力正是大型语言模型。

## Transformer 架构

2017 年，Google 提出了 Transformer 架构，彻底改变了自然语言处理领域。其核心机制是**自注意力机制 (Self-Attention)**。

通过自注意力，模型能够在处理一个词时，不仅关注这个词本身，还能计算它与句子中其他所有词的关联程度，从而更好地理解上下文。

## 训练阶段

1.  **预训练 (Pre-training)**：在海量文本数据上进行无监督学习，目标通常是“预测下一个词”。在这个阶段，模型学习到了语法、世界知识和一定的推理能力。
2.  **微调 (Fine-tuning)**：使用高质量的标注数据进行有监督学习，让模型适应特定的任务。
3.  **人类反馈强化学习 (RLHF)**：通过人类的偏好反馈，进一步调整模型的行为，使其输出更加安全、有用、符合人类价值观。

## 展望

LLM 的能力边界仍在不断扩展，未来在多模态、逻辑推理等方面值得期待。
    `,
    author: 'AI_Researcher',
    date: '2024-01-20',
    likes: 450,
    tags: ['AI', 'LLM', '深度学习'],
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '2',
    author: 'DesignNerd',
    content: '这篇文章太棒了！我马上就在我的个人网站上用上了这些发光效果，科技感拉满！',
    date: '2023-11-06T10:20:00Z',
  },
  {
    id: 'c2',
    articleId: '2',
    author: 'CodeJunkie',
    content: 'Glitch 效果那部分能详细讲讲 clip-path 的实现吗？',
    date: '2023-11-07T14:35:00Z',
  },
  {
    id: 'c3',
    articleId: '1',
    author: 'ReactFan',
    content: 'useTransition 确实好用，解决了我列表渲染卡顿的老大难问题。',
    date: '2023-10-25T09:12:00Z',
  }
];
