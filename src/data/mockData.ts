import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '探索 React 19 的并发特性与性能优化',
    excerpt: '在本文中，我们将深入探讨 React 19 带来的最新并发特性，以及如何在实际项目中应用这些特性来提升前端性能和用户体验。',
    content: `## React 19 并发渲染解析

React 19 带来了许多令人兴奋的新特性，其中最引人注目的莫过于并发渲染的进一步完善。

### 什么是并发渲染？
并发渲染允许 React 暂停、恢复和放弃渲染工作，这意味着它可以在不阻塞主线程的情况下渲染复杂的 UI 树。

\`\`\`tsx
import { useTransition, useState } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

### 性能优化最佳实践
- 使用 \`useTransition\` 处理非紧急状态更新
- 使用 \`useDeferredValue\` 延迟渲染不重要的部分
- 配合 Server Components 提升首屏加载速度
    `,
    tags: ['React', '前端', '性能优化'],
    likes: 1024,
    date: '2026-03-20',
    author: 'CyberDev',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '深入理解 WebGL 与 3D 渲染管线',
    excerpt: 'WebGL 是在网页上实现 3D 渲染的核心技术。本文将带你从零开始，理解 WebGL 的底层渲染管线和着色器编程。',
    content: `## WebGL 渲染管线初探

WebGL 是一套基于 OpenGL ES 的 JavaScript API，用于在不需要插件的情况下在任何兼容的网页浏览器中渲染交互式 2D 和 3D 图形。

### 顶点着色器 (Vertex Shader)
顶点着色器的主要作用是计算顶点的位置。

\`\`\`glsl
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}
\`\`\`

### 片段着色器 (Fragment Shader)
片段着色器负责计算每个像素的颜色。

\`\`\`glsl
precision mediump float;
void main() {
  gl_FragColor = vec4(0.0, 0.94, 1.0, 1.0); // 霓虹蓝
}
\`\`\`
    `,
    tags: ['WebGL', '3D', '图形学'],
    likes: 856,
    date: '2026-03-22',
    author: 'NeonMatrix',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'AI 时代的开发者生存指南：如何利用大模型提升效率',
    excerpt: '大模型时代的到来彻底改变了软件开发的方式。本文分享了如何利用各类 AI 工具提升编码效率，实现10倍生产力。',
    content: `## AI 辅助开发的核心思路

在当今时代，熟练运用 AI 工具已经成为开发者的核心竞争力之一。

### 提示词工程 (Prompt Engineering)
编写清晰、具体的提示词是获得高质量代码的关键。

1. **设定角色**：告诉 AI 它是一个资深的前端工程师。
2. **明确上下文**：提供项目背景、技术栈版本。
3. **给出约束**：限制使用的库、编码风格等。

### 自动化测试与重构
利用 AI 生成测试用例和重构陈旧代码，可以大幅减少技术债务。
    `,
    tags: ['AI', '效率', '经验分享'],
    likes: 1250,
    date: '2026-03-25',
    author: 'AI_Whisperer',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    title: '构建赛博朋克风格的 UI 组件库',
    excerpt: '厌倦了千篇一律的极简风格？来看看如何使用 TailwindCSS 和 Framer Motion 打造一套极具未来感的 UI 组件。',
    content: `## 赛博朋克 UI 设计解析

赛博朋克风格通常包含以下元素：
- 深色背景
- 霓虹发光效果 (Glow effects)
- 玻璃拟态 (Glassmorphism)
- 机械感/像素化的字体

### 发光按钮实现
使用 TailwindCSS 可以很方便地实现发光效果。

\`\`\`html
<button class="px-6 py-2 bg-transparent border border-cyan text-cyan hover:bg-cyan hover:text-dark transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]">
  SYSTEM.INITIALIZE()
</button>
\`\`\`
    `,
    tags: ['UI/UX', 'Tailwind', '设计'],
    likes: 932,
    date: '2026-03-26',
    author: 'CyberDev',
    coverImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '3',
    username: 'CodeNinja',
    content: '这篇文章太有启发了，提示词工程确实是现在的必修课！',
    date: '2026-03-26T10:30:00Z'
  },
  {
    id: 'c2',
    articleId: '3',
    username: 'WebMaker',
    content: '同感，我最近用 AI 帮我写单测，效率提升了不止一倍。',
    date: '2026-03-26T14:15:00Z'
  },
  {
    id: 'c3',
    articleId: '1',
    username: 'ReactLover',
    content: 'useTransition 真的很强大，不过在使用时也要注意不要滥用，否则会引起其他性能问题。',
    date: '2026-03-21T09:20:00Z'
  }
];
