import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染',
    summary: 'React 18 引入了并发渲染机制，极大提升了应用的响应能力。本文带你深入源码剖析其实现原理。',
    content: "并发渲染（Concurrent Rendering）是 React 18 中最核心的更新之一。\n\n它允许 React 在后台渲染更新，而不会阻塞主线程。这意味着当用户输入或发生其他高优先级交互时，React 可以中断当前的渲染，优先处理这些交互，从而保持应用的流畅和响应。\n\n### 什么是并发？\n并发不等于并行。在 JavaScript 的单线程环境中，并发意味着任务可以交替执行。React 通过时间切片（Time Slicing）实现了这一点。\n\n### 核心 API\n- **createRoot**: 开启并发模式的入口。\n- **useTransition**: 用于标记非阻塞的状态更新。\n- **useDeferredValue**: 延迟更新部分 UI，以保持高优先级更新的流畅。\n\n通过这些机制，我们能够构建出更具科技感、更顺滑的 Web 体验。",
    likes: 1205,
    date: '2023-10-12',
    tags: ['React', '前端', '源码']
  },
  {
    id: '2',
    title: 'Tailwind CSS 高级技巧：构建赛博朋克 UI',
    summary: '如何利用 Tailwind CSS 的自定义配置和伪类，快速打造具有赛博朋克和未来科技感的用户界面。',
    content: "在现代 Web 开发中，Tailwind CSS 以其原子化的特性备受青睐。但你是否知道，它同样非常适合用来构建极其复杂的科技感 UI？\n\n### 1. 自定义颜色和发光效果\n通过配置 `tailwind.config.js`，我们可以扩展颜色主题，加入霓虹色：\n```js\ntheme: {\n  extend: {\n    colors: {\n      cyan: '#00f0ff',\n      neonPurple: '#bc13fe'\n    },\n    boxShadow: {\n      'neon': '0 0 10px #00f0ff, 0 0 20px #00f0ff',\n    }\n  }\n}\n```\n\n### 2. 边框与发光\n利用自定义的 shadow 和 border 颜色，我们可以轻松让按钮看起来具有全息投影的感觉。\n\n### 3. 玻璃拟态 (Glassmorphism)\n结合 `backdrop-blur` 和带有透明度的背景色，可以营造出层次分明的科幻面板效果。",
    likes: 3420,
    date: '2023-11-05',
    tags: ['CSS', '前端', '设计']
  },
  {
    id: '3',
    title: 'AI 大模型在前端开发中的落地应用',
    summary: '探讨如何将大语言模型（LLM）集成到前端应用中，提升开发效率和用户体验。',
    content: "随着大模型的爆发，前端工程的边界正在被重新定义。\n\n### 1. 代码生成与补全\n通过类似 GitHub Copilot 这样的工具，开发者能够大幅减少模板代码的编写时间。\n\n### 2. 智能交互\n将 LLM 接入前端，可以实现智能对话框、语义搜索等功能，赋予应用\"思考\"的能力。\n\n### 3. 提示词工程 (Prompt Engineering)\n如何在前端更好地构建和管理 Prompt，成为了一个新的课题。我们需要确保传递给模型的上下文足够精准，以获取高质量的输出。\n\n未来，AI 将成为每一个前端应用的标配组件。",
    likes: 850,
    date: '2023-12-20',
    tags: ['AI', '前端', 'LLM']
  },
  {
    id: '4',
    title: 'Rust 与 WebAssembly：突破性能瓶颈',
    summary: '使用 Rust 编写 WebAssembly 模块，为你的前端应用带来原生的执行速度。',
    content: "当 JavaScript 的性能达到极限时，WebAssembly (Wasm) 成为了我们的破局之道。而 Rust，凭借其内存安全和高性能的特点，成为了编写 Wasm 的绝佳选择。\n\n### 为什么选择 Rust？\n- **零成本抽象**：即使是高级特性也不会带来运行时的开销。\n- **没有垃圾回收 (GC)**：这使得 Rust 编译出的 Wasm 模块体积更小，执行更可预测。\n\n### 实践指南\n我们可以使用 `wasm-pack` 快速打包 Rust 代码并在前端引入。在处理大量数据计算、图像处理等场景中，这种架构能带来数倍的性能提升。",
    likes: 2100,
    date: '2024-01-15',
    tags: ['Rust', 'WebAssembly', '性能优化']
  }
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    articleId: '1',
    username: 'CodeRunner',
    content: '并发模式确实解决了我们在复杂列表渲染时的卡顿问题！',
    date: '2023-10-13 10:24'
  },
  {
    id: 'c2',
    articleId: '2',
    username: 'CyberPunk2077',
    content: '发光阴影的配置太实用了，正好要在我的新项目里用到。',
    date: '2023-11-06 14:12'
  },
  {
    id: 'c3',
    articleId: '2',
    username: 'UI_Master',
    content: '如果能加上一些故障(Glitch)动画效果就更完美了。',
    date: '2023-11-08 09:30'
  }
];