import { Article, Comment } from '../types';

export const initialArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染',
    excerpt: '并发渲染是 React 18 引入的突破性特性。本文将深入探讨 Concurrent Mode 的核心概念，以及它如何改善应用性能。',
    content: `
# 深入理解 React 18 并发渲染

React 18 带来了许多激动人心的新特性，其中最核心的莫过于**并发渲染（Concurrent Rendering）**。

## 什么是并发渲染？

在 React 18 之前，React 的渲染过程是同步的。一旦开始渲染，React 就会阻塞主线程，直到渲染完成。这在处理复杂更新或慢速设备时，容易导致页面卡顿。

并发渲染打破了这一限制。它允许 React 中断正在进行的渲染工作，去处理更高优先级的任务（如用户输入、动画），然后再恢复之前的渲染。

## 核心 API

1. \`useTransition\`
2. \`useDeferredValue\`

### 示例代码

\`\`\`tsx
import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {isPending ? <span>Loading...</span> : <SearchResults query={query} />}
    </div>
  );
}
\`\`\`

## 总结
并发特性极大地提升了 React 应用的用户体验，尤其是在复杂的交互场景下。掌握它们是现代前端开发者的必修课。
    `,
    tags: ['React', 'Frontend', 'Performance'],
    likes: 1024,
    createdAt: '2023-10-12',
    author: 'CyberCoder',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: '探索赛博朋克风格的 UI 设计',
    excerpt: '如何通过 CSS 和现代前端技术，打造令人惊叹的赛博朋克/未来主义风格用户界面？本文分享一些实用的设计与代码技巧。',
    content: `
# 探索赛博朋克风格的 UI 设计

赛博朋克风格以其强烈的视觉冲击力、霓虹色彩和高科技感，吸引了大量设计师和开发者。

## 关键视觉元素

- **深色背景**：通常以黑色、深灰色或深蓝色作为主背景。
- **霓虹发光（Neon Glow）**：高亮度的青色、粉色、绿色等，配合发光效果。
- **故障艺术（Glitch Art）**：偶尔的错位、颜色分离，营造出"数字故障"的美感。
- **网格与几何图形**：背景中的网格线、斜切的按钮边缘。

## CSS 实现发光效果

最简单的方法是使用 \`box-shadow\` 和 \`text-shadow\`：

\`\`\`css
.neon-text {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #00f0ff,
    0 0 40px #00f0ff,
    0 0 80px #00f0ff;
}

.neon-box {
  border: 1px solid #b026ff;
  box-shadow: 
    0 0 10px rgba(176, 38, 255, 0.5),
    inset 0 0 10px rgba(176, 38, 255, 0.5);
}
\`\`\`

## 结论

结合 Tailwind CSS 的自定义配置，我们可以非常快速地搭建出一套完整的赛博朋克 UI 框架。
    `,
    tags: ['Design', 'CSS', 'UI/UX'],
    likes: 2048,
    createdAt: '2023-11-05',
    author: 'NeonDesigner',
    coverImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Rust 语言入门：为什么它如此受欢迎？',
    excerpt: '连续多年被评为最受开发者喜爱的语言，Rust 究竟有何魔力？一起来了解它的所有权机制和内存安全。',
    content: `
# Rust 语言入门：为什么它如此受欢迎？

Rust 是一门系统编程语言，专注于安全，尤其是并发安全。

## 核心特性

1. **零成本抽象**
2. **所有权（Ownership）机制**
3. **无数据竞争的并发**

## 什么是所有权？

在许多语言中，内存管理要么通过垃圾回收器（GC），要么需要手动分配和释放（如 C/C++）。Rust 采用了第三种方式：内存通过一个所有权系统来管理，该系统在编译时进行检查。

### 所有权规则

1. Rust 中的每一个值都有一个被称为其**所有者**（owner）的变量。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 的所有权移动到了 s2

    // println!("{}, world!", s1); // 这行代码会报错，因为 s1 不再有效
    println!("{}, world!", s2); // 正常运行
}
\`\`\`

## 总结

学习 Rust 的曲线虽然陡峭，但它的编译器就像一个严厉但优秀的导师，帮助你写出极其稳定和高性能的代码。
    `,
    tags: ['Rust', 'Backend', 'Programming'],
    likes: 856,
    createdAt: '2023-12-20',
    author: 'SystemHacker',
    coverImage: 'https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?q=80&w=1000&auto=format&fit=crop',
  }
];

export const initialComments: Comment[] = [
  {
    id: 'c1',
    articleId: '2',
    authorName: '前端小菜鸟',
    content: '这篇文章太酷了！发光效果的代码非常实用。',
    createdAt: '2023-11-06T10:00:00Z',
  },
  {
    id: 'c2',
    articleId: '1',
    authorName: 'ReactFan',
    content: '并发渲染确实解决了很多以前的痛点，期待更多实战案例。',
    createdAt: '2023-10-13T14:30:00Z',
  }
];
