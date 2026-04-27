export interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

export interface Post {
  id: number;
  title: string;
  abstract: string;
  content: string;
  likes: number;
  tags: string[];
  date: string;
  comments: Comment[];
}

export const posts: Post[] = [
  {
    id: 1,
    title: "未来已来：2024年的量子计算突破",
    abstract: "量子计算正在以惊人的速度发展，本文探讨了最新的突破及其对密码学的潜在影响。",
    content: "量子计算在过去的一年里取得了长足的进步。随着新型超导量子比特的出现，退相干时间大幅增加...\n\n在接下来的十年里，我们可能会看到真正的商业应用落地。",
    likes: 1205,
    tags: ["量子计算", "科技前沿", "硬件"],
    date: "2024-03-12",
    comments: [
      { id: 1, user: "CyberFan", text: "非常期待量子计算的普及！", date: "2024-03-13" }
    ]
  },
  {
    id: 2,
    title: "AI大模型：重塑开发者的工作流",
    abstract: "随着大语言模型的普及，开发者的日常工作发生了翻天覆地的变化。我们该如何适应？",
    content: "AI辅助编程工具已经成为开发者的标配。从Copilot到各种智能IDE插件，代码生成的准确率越来越高...\n\n然而，这并不意味着程序员会被取代，而是要求我们具备更强的系统架构设计能力和业务理解力。",
    likes: 850,
    tags: ["AI", "编程", "未来趋势"],
    date: "2024-04-01",
    comments: [
      { id: 1, user: "DevGuru", text: "说得很对，AI是工具，不是替代品。", date: "2024-04-02" },
      { id: 2, user: "NoobCoder", text: "正在学习如何用好这些AI工具。", date: "2024-04-03" }
    ]
  },
  {
    id: 3,
    title: "Web3.0的黎明：去中心化网络架构解析",
    abstract: "深入浅出地讲解Web3.0的核心技术，以及它将如何改变我们的数字生活。",
    content: "Web3.0不仅仅是区块链和加密货币，它代表着互联网控制权的转移...\n\n去中心化身份(DID)和IPFS等技术正在构建一个更抗审查和隐私友好的网络环境。",
    likes: 640,
    tags: ["Web3", "区块链", "网络架构"],
    date: "2024-02-18",
    comments: []
  },
  {
    id: 4,
    title: "赛博朋克美学在现代网页设计中的应用",
    abstract: "探索霓虹色调、故障艺术和未来主义排版如何在现代网页设计中创造沉浸式体验。",
    content: "赛博朋克不仅是一种科幻子流派，更是一种独特的设计语言。在网页设计中，高对比度的霓虹色彩、暗黑背景以及具有机械感的UI组件...\n\n本文分析了几个优秀的科技感网站案例，并提供了实现类似效果的CSS技巧。",
    likes: 1530,
    tags: ["设计", "前端", "美学"],
    date: "2024-04-15",
    comments: [
      { id: 1, user: "DesignNinja", text: "这篇文章给了我很多设计灵感！", date: "2024-04-16" }
    ]
  }
];
