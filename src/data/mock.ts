import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染机制',
    abstract: 'React 18 引入了并发特性，它彻底改变了前端渲染的底层逻辑。本文将带你从源码和实践角度，解析 Concurrent Mode 的奥秘。',
    content: `## 并发渲染的背景

在之前的版本中，React 的渲染是同步且不可中断的。一旦开始渲染，主线程就会被阻塞，直到渲染完成。这在大型应用中可能会导致卡顿，影响用户体验。

## React 18 的革新

React 18 引入了并发渲染机制（Concurrent Rendering），使得渲染过程变得可中断。React 可以根据优先级调度不同的渲染任务，从而保证高优先级的交互（如用户输入、点击）能够得到及时响应。

### 核心特性

1. **useTransition**: 允许将某些状态更新标记为非紧急过渡更新。
2. **useDeferredValue**: 延迟更新某个不太重要的值。
3. **Suspense 增强**: 支持在服务器端渲染和并发模式下更好地处理异步数据流。

## 总结
并发特性让开发者能够更容易地构建出高性能、丝滑交互的前端应用。
`,
    likes: 342,
    tags: ['React', 'Frontend', 'Performance'],
    date: '2026-03-20',
    readTime: 8,
    author: 'CyberDev',
  },
  {
    id: '2',
    title: '基于 WebGL 的 3D 网页设计指南',
    abstract: '三维技术在网页中的应用越来越广泛。本文介绍了如何利用 Three.js 和 React Three Fiber 构建沉浸式的 3D 网页体验。',
    content: `## WebGL 简介

WebGL 是一项利用显卡硬件加速的 3D 绘图技术。由于其底层 API 较为复杂，社区涌现了许多封装库，最著名的便是 Three.js。

## 结合 React 的力量

React Three Fiber (R3F) 是一个针对 Three.js 的 React 渲染器，它允许我们以声明式的方式编写 3D 场景。

\`\`\`tsx
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
}
\`\`\`

## 光影与材质
通过调整环境光、点光源以及使用 PBR 材质，可以营造出极具真实感的科技氛围。
`,
    likes: 521,
    tags: ['WebGL', 'Three.js', 'React'],
    date: '2026-03-25',
    readTime: 12,
    author: 'CyberDev',
  },
  {
    id: '3',
    title: '赛博朋克 UI：Tailwind CSS 高级技巧',
    abstract: '如何仅使用 Tailwind CSS 打造充满未来感和霓虹灯效果的赛博朋克风格界面？这篇文章将揭示其中的奥秘。',
    content: `## 赛博朋克美学

赛博朋克风格通常包含以下元素：
- 深色/黑色背景
- 高对比度的霓虹色彩（如亮蓝、粉红、荧光绿）
- 几何形状和硬朗的边缘
- 发光效果（Glow）和扫描线

## Tailwind 实践

我们可以通过自定义 Tailwind 的配置来轻松实现这种效果。

### 发光效果 (Glow)
通过 \`box-shadow\` 扩展：

\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'neon': '0 0 10px theme("colors.cyan.400"), 0 0 20px theme("colors.cyan.500")',
      }
    }
  }
}
\`\`\`

### 使用示例
\`\`\`html
<button class="bg-gray-900 border border-cyan-400 text-cyan-400 shadow-neon px-4 py-2 hover:bg-cyan-400 hover:text-black transition-all">
  ENTER SYSTEM
</button>
\`\`\`
`,
    likes: 189,
    tags: ['CSS', 'Tailwind', 'Design'],
    date: '2026-03-22',
    readTime: 6,
    author: 'CyberDev',
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '2',
    author: 'Neo',
    content: '这篇文章写得太棒了，R3F 极大地简化了 3D 场景的开发！',
    date: '2026-03-26T10:20:00Z',
  },
  {
    id: 'c2',
    articleId: '2',
    author: 'Trinity',
    content: '期待能出一篇关于 Shader 编程的进阶教程。',
    date: '2026-03-26T14:05:00Z',
  },
];
