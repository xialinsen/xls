export interface Post {
  id: string;
  title: string;
  abstract: string;
  content: string;
  coverImage: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: string;
  author: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

// Mock Data
const mockPosts: Post[] = [
  {
    id: "1",
    title: "构建下一代赛博朋克风格Web应用",
    abstract: "探讨如何使用 React 和 Tailwind CSS 结合自定义动画，打造具有极强未来感和科技感的沉浸式用户体验。",
    content: "## 引言\n\n在当今的Web开发中，视觉体验越来越重要。赛博朋克（Cyberpunk）风格以其独特的霓虹色彩、暗黑背景和高科技元素，成为了许多极客和设计师的偏爱。\n\n## 核心元素\n\n1. **深色背景**：通常使用深邃的黑色或深蓝色作为主背景。\n2. **霓虹发光**：通过CSS的 `box-shadow` 和 `text-shadow` 实现。\n3. **科技感字体**：如 `Orbitron` 或 `Rajdhani`。\n\n## 实现技巧\n\n我们可以使用 Tailwind CSS 的自定义配置来轻松实现这些效果。例如，配置一个 `neon-blue` 颜色，并为其添加发光动画。\n\n```css\n.text-glow {\n  text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);\n}\n```\n\n通过结合 Framer Motion，我们可以添加流畅的页面切换和元素出现动画，让整个应用充满活力。",
    coverImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1000",
    tags: ["前端", "设计", "React"],
    likes: 1024,
    views: 8900,
    createdAt: "2024-03-20",
    author: "NeonCoder"
  },
  {
    id: "2",
    title: "深入理解现代状态管理：Zustand 最佳实践",
    abstract: "抛弃繁琐的 Redux 样板代码，拥抱轻量级的 Zustand，本文带你全面了解在复杂前端项目中的状态管理方案。",
    content: "## 为什么选择 Zustand？\n\nZustand 是一个轻量级、快速且可扩展的裸状态管理解决方案。它的 API 设计简单直观，没有冗长的样板代码。\n\n## 基础用法\n\n创建一个 store 非常简单：\n\n```typescript\nimport { create } from 'zustand'\n\nconst useStore = create((set) => ({\n  bears: 0,\n  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\n  removeAllBears: () => set({ bears: 0 }),\n}))\n```\n\n## 高级特性\n\n它还支持中间件，如 Redux DevTools 和持久化存储，让你在享受简单性的同时不失强大的功能。",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["前端", "React", "状态管理"],
    likes: 856,
    views: 5200,
    createdAt: "2024-03-18",
    author: "CyberNinja"
  },
  {
    id: "3",
    title: "Web3.0 与去中心化应用架构解析",
    abstract: "从智能合约到前端 DApp 集成，详解 Web3 应用的技术栈及架构演进。",
    content: "## Web3 架构概览\n\n传统的 Web2 应用依赖于中心化服务器和数据库。而在 Web3 中，后端逻辑大部分被智能合约取代，数据存储在区块链上。\n\n## 前端集成\n\n前端开发者需要学习如何使用 `ethers.js` 或 `viem` 等库与区块链进行交互。用户通过钱包（如 MetaMask）进行身份验证和签名交易。\n\n## 挑战与未来\n\n虽然前景广阔，但 Web3 仍面临诸如性能、用户体验和安全性等挑战。我们需要不断探索更优的解决方案。",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f4d231d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Web3", "区块链", "架构"],
    likes: 642,
    views: 4100,
    createdAt: "2024-03-15",
    author: "BlockHacker"
  },
  {
    id: "4",
    title: "AI 赋能研发：大模型时代的编程新范式",
    abstract: "探讨 GitHub Copilot, Trae 等 AI 工具如何重塑程序员的日常开发流程，以及如何更好地与 AI 协作。",
    content: "## AI 编程助手的发展\n\n随着 LLM 的爆发，AI 编程助手已经从简单的代码补全演变为能够理解项目上下文、进行架构设计和代码重构的强大工具。\n\n## 最佳协作实践\n\n1. **清晰的 Prompt**：准确描述你的需求和上下文。\n2. **逐步引导**：将复杂任务拆解为小步骤。\n3. **代码审查**：永远不要盲目信任 AI 生成的代码，人工审查是必不可少的。\n\n## 未来展望\n\nAI 不会取代程序员，而是会取代不会使用 AI 的程序员。",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    tags: ["AI", "开发工具", "未来趋势"],
    likes: 1250,
    views: 12000,
    createdAt: "2024-03-22",
    author: "AI_Explorer"
  }
];

let mockComments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    authorName: "V_Cyber",
    content: "这设计太酷了！非常喜欢这种霓虹发光的感觉。",
    createdAt: "2024-03-21T10:30:00Z"
  },
  {
    id: "c2",
    postId: "1",
    authorName: "ReactLover",
    content: "请问有源码参考吗？想学习一下 Framer Motion 的具体用法。",
    createdAt: "2024-03-21T14:15:00Z"
  }
];

export const apiService = {
  getPosts: async (keyword?: string, tag?: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // 模拟网络延迟
    let filtered = [...mockPosts];
    
    if (keyword) {
      const lowerKw = keyword.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(lowerKw) || 
        p.abstract.toLowerCase().includes(lowerKw)
      );
    }
    
    if (tag) {
      filtered = filtered.filter(p => p.tags.includes(tag));
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getTopLikedPost: async (): Promise<Post> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockPosts].sort((a, b) => b.likes - a.likes)[0];
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockPosts.find(p => p.id === id);
  },

  getCommentsByPostId: async (postId: string): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockComments.filter(c => c.postId === postId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addComment: async (postId: string, authorName: string, content: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newComment: Comment = {
      id: `c${Date.now()}`,
      postId,
      authorName,
      content,
      createdAt: new Date().toISOString()
    };
    mockComments.push(newComment);
    return newComment;
  },

  getAllTags: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const tags = new Set<string>();
    mockPosts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }
};
