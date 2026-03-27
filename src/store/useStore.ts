import { create } from 'zustand';
import { Article, Comment } from '../types';

interface BlogState {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: '深入理解量子计算与神经网络的结合',
    summary: '探讨量子位在深度学习模型中的潜在应用，以及如何通过量子态叠加突破传统计算瓶颈。',
    content: `## 引言
在当今的科技前沿，**量子计算**与**神经网络**的结合被认为是下一个突破口。传统计算机在处理复杂的大规模数据集时，逐渐显露出算力瓶颈，而量子计算的叠加态与纠缠特性，或许能为深度学习带来指数级的性能提升。

## 量子位的优势
传统比特只能表示0或1，而量子位（Qubit）可以同时处于0和1的叠加态。这意味着在一个具有N个量子位的系统中，我们可以同时处理 $2^N$ 种状态。

### 代码示例：模拟量子门
以下是一个使用 Python 的伪代码，展示了如何通过基础量子门初始化状态：
\`\`\`python
from qiskit import QuantumCircuit, execute, Aer

# 创建一个包含2个量子位的电路
qc = QuantumCircuit(2)

# 对第一个量子位应用Hadamard门
qc.h(0)

# 应用CNOT门，产生纠缠
qc.cx(0, 1)

print(qc.draw())
\`\`\`

## 结论
尽管量子神经网络（QNN）仍处于起步阶段，但其在材料科学、密码学以及复杂系统模拟等领域已经展现出不可替代的潜力。未来十年，我们有望看到第一批商业化的量子AI模型诞生。
`,
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    likes: 1240,
    date: '2026-03-15',
    tags: ['Quantum', 'AI', 'Future']
  },
  {
    id: '2',
    title: '赛博朋克美学下的前端UI设计指南',
    summary: '如何在现代Web应用中实现发光效果、毛玻璃与网格背景，打造极致的科技感体验。',
    content: `## 为什么选择赛博朋克风格？
赛博朋克（Cyberpunk）不仅是一种科幻流派，更是一种视觉语言。高对比度的霓虹色彩、深邃的暗黑背景、以及复杂的网格与发光元素，共同构建了这种极具未来感的界面设计。

## 核心视觉元素
1. **霓虹色彩**: 极客蓝（Cyan）、荧光紫（Purple）、亮绿色（Neon Green）。
2. **毛玻璃效果 (Glassmorphism)**: 利用 \`backdrop-filter\` 结合半透明背景。
3. **发光阴影**: 摒弃传统的黑色阴影，使用带有色彩的发光 \`box-shadow\`。

### CSS 发光效果实现
\`\`\`css
.neon-button {
  background: transparent;
  border: 2px solid #00f3ff;
  color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5), inset 0 0 10px rgba(0, 243, 255, 0.5);
  transition: all 0.3s ease;
}

.neon-button:hover {
  background: #00f3ff;
  color: #050505;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.8), inset 0 0 20px rgba(0, 243, 255, 0.8);
}
\`\`\`

## 结语
设计不仅仅是视觉的堆砌，更是氛围的营造。在追求炫酷的同时，也要注意信息层级与可读性。`,
    cover: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
    likes: 856,
    date: '2026-03-20',
    tags: ['Design', 'CSS', 'Cyberpunk']
  },
  {
    id: '3',
    title: 'Web3.0与去中心化架构的演进',
    summary: '从智能合约到IPFS，全面解析下一代互联网的底层技术栈。',
    content: `## Web3.0 的核心理念
Web3.0 旨在将数据的控制权交还给用户。通过区块链技术，我们不再依赖于中心化的服务器。

## 技术栈解析
- **以太坊 / 智能合约**: 业务逻辑的载体。
- **IPFS**: 去中心化的文件存储。
- **Ethers.js / Web3.js**: 前端与区块链交互的桥梁。

未来的互联网将是透明、开放且不可篡改的。`,
    cover: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800',
    likes: 642,
    date: '2026-03-25',
    tags: ['Web3', 'Blockchain']
  },
  {
    id: '4',
    title: 'Rust在系统级编程中的崛起',
    summary: '为什么越来越多的底层项目开始从C/C++转向Rust？内存安全与性能的完美平衡。',
    content: `## 内存安全
Rust 通过所有权（Ownership）机制在编译期就解决了内存泄漏和数据竞争的问题。

## 性能表现
无垃圾回收（GC）的设计，让 Rust 拥有媲美 C/C++ 的运行速度。`,
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    likes: 920,
    date: '2026-03-26',
    tags: ['Rust', 'Systems']
  }
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    articleId: '1',
    user: 'CyberGeek',
    content: '这篇文章太棒了！量子计算的门槛确实很高，但你解释得很通俗。',
    date: '2026-03-16T10:30:00Z'
  },
  {
    id: 'c2',
    articleId: '2',
    user: 'UI_Ninja',
    content: '发光阴影的代码直接拿去用了，效果拉满！',
    date: '2026-03-21T14:20:00Z'
  }
];

export const useStore = create<BlogState>((set) => ({
  articles: MOCK_ARTICLES,
  comments: MOCK_COMMENTS,
  searchQuery: '',
  selectedTag: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  addComment: (comment) => set((state) => ({
    comments: [
      {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString()
      },
      ...state.comments
    ]
  }))
}));
