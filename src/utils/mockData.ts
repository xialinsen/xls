import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解 React 18 并发渲染机制',
    summary: '本文详细解析了 React 18 中的并发渲染（Concurrent Rendering）机制，包括 Suspense、useTransition 等新特性的底层原理和实际应用场景。',
    content: `
# 深入理解 React 18 并发渲染机制

React 18 引入的最重要的特性无疑是并发渲染（Concurrent Rendering）。它不仅是一个新功能，更是 React 底层架构的一次重大升级。

## 什么是并发渲染？

在 React 18 之前，渲染是一个同步且不可中断的过程。一旦开始渲染，React 就会一直执行直到渲染完成，这可能会导致在渲染大型组件树时主线程被阻塞，从而造成页面卡顿。

并发渲染打破了这一限制。它允许 React 中断正在进行的渲染工作，去处理更高优先级的任务（如用户输入、动画等），然后再恢复之前的渲染。

## 核心 API

### 1. useTransition
\`useTransition\` 允许你将某些状态更新标记为非阻塞的"过渡"状态。

\`\`\`tsx
const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(() => {
    // 这里的状态更新会被降低优先级
    setSearchQuery(input);
  });
};
\`\`\`

### 2. Suspense
Suspense 允许你在组件树的一部分尚未准备好时，显示一个后备 UI（Fallback UI）。在 React 18 中，Suspense 真正与并发渲染结合，支持了服务端渲染（SSR）和数据获取。

## 总结
并发渲染为我们提供了更细粒度的控制权，使得我们能够构建出响应更迅速、体验更流畅的 Web 应用。
    `,
    tags: ['React', '前端', 'Web开发'],
    likes: 1250,
    createdAt: '2023-10-24T10:00:00Z',
  },
  {
    id: '2',
    title: '构建具有赛博朋克风格的现代化 Web 界面',
    summary: '探讨如何使用 Tailwind CSS 和 Framer Motion 打造极具科技感和未来感的赛博朋克风格网页设计，包含发光效果和动态网格背景。',
    content: `
# 构建具有赛博朋克风格的现代化 Web 界面

赛博朋克（Cyberpunk）风格以其独特的霓虹色彩、故障艺术（Glitch Art）和高科技质感，在现代 Web 设计中越来越受欢迎。本文将探讨如何使用 Tailwind CSS 实现这种风格。

## 色彩调色板

赛博朋克的核心在于高对比度的色彩搭配。通常以深色（如深空黑或深紫）为背景，搭配明亮的霓虹色。

- **主背景**：#0A0A0A
- **霓虹青**：#00F0FF (Cyan)
- **赛博紫**：#8B5CF6 (Purple)
- **警告红**：#FF003C

## 实现发光边框 (Neon Border)

在 Tailwind 中，我们可以通过自定义 \`box-shadow\` 或者使用伪元素和渐变来实现发光效果。

\`\`\`css
.neon-border {
  position: relative;
}
.neon-border::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #00F0FF, #8B5CF6);
  filter: blur(10px);
  opacity: 0.5;
  z-index: -1;
  transition: opacity 0.3s;
}
.neon-border:hover::before {
  opacity: 1;
}
\`\`\`

## 玻璃拟态 (Glassmorphism)

结合半透明背景和背景模糊（Backdrop Blur），可以创造出科技感十足的悬浮面板。

\`\`\`html
<div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
  <!-- 内容 -->
</div>
\`\`\`

通过这些简单的技巧，你可以为你的网站注入强烈的未来科技感。
    `,
    tags: ['CSS', '设计', 'Tailwind'],
    likes: 890,
    createdAt: '2023-11-05T14:30:00Z',
  },
  {
    id: '3',
    title: 'AI 时代的程序员：如何利用大模型提升效率',
    summary: '随着 ChatGPT 等大模型的普及，程序员的工作方式正在发生深刻改变。本文分享如何将 AI 融入日常开发工作流。',
    content: `
# AI 时代的程序员：如何利用大模型提升效率

人工智能技术的爆发式发展，特别是大型语言模型（LLM）的成熟，正在重塑软件工程的面貌。作为开发者，我们应该如何适应并利用这些工具？

## 代码生成与补全

GitHub Copilot 和类似工具已经成为了许多开发者的标配。它们不仅能补全代码片段，甚至能根据注释生成完整的函数或类。

> 提示：提供清晰、具体的注释是获得高质量 AI 生成代码的关键。

## 辅助重构与代码审查

当你面对一段祖传的"面条代码"时，可以让 AI 帮你分析其逻辑，并提供重构建议。AI 擅长发现潜在的安全漏洞和性能瓶颈。

## 学习新语言和框架

过去，学习一门新技术需要查阅大量官方文档和教程。现在，你可以直接向 AI 提问："在 Rust 中如何实现多线程通信？请给出一个简单的例子。" 这大大缩短了学习曲线。

## 结语

AI 不会取代程序员，但使用 AI 的程序员会取代不使用的程序员。拥抱变化，将 AI 视为你的"结对编程"伙伴。
    `,
    tags: ['AI', '效率', '职业发展'],
    likes: 2100,
    createdAt: '2024-01-12T09:15:00Z',
  },
  {
    id: '4',
    title: 'TypeScript 高级类型系统探索',
    summary: '深入探讨 TypeScript 的高级类型特性，包括条件类型、映射类型、模板字面量类型等，助你编写更安全、更健壮的代码。',
    content: `
# TypeScript 高级类型系统探索

TypeScript 的类型系统非常强大且图灵完备。掌握其高级特性，可以让你在编写库或复杂业务逻辑时游刃有余。

## 条件类型 (Conditional Types)

条件类型允许类型系统根据条件表达式选择不同的类型。

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<number>;  // false
\`\`\`

## 映射类型 (Mapped Types)

映射类型可以基于现有类型创建新类型，常用于类型的批量转换。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
\`\`\`

## 模板字面量类型 (Template Literal Types)

这是 TS 4.1 引入的强大特性，允许你在类型级别进行字符串拼接。

\`\`\`typescript
type EventName<T extends string> = \`\${T}Changed\`;

type NameEvent = EventName<'name'>; // "nameChanged"
\`\`\`

熟练使用这些特性，你将能够构建出极其精确的类型约束。
    `,
    tags: ['TypeScript', '前端'],
    likes: 650,
    createdAt: '2023-09-18T16:45:00Z',
  }
];
