import type { Post } from '@/types/content'

export const posts: Post[] = [
  {
    id: 'p1',
    slug: 'rituals-of-readable-writing',
    title: '让可读性成为写作系统：三种日常仪式',
    summary: '当文章像界面一样可被设计，读者会更快进入你的表达节奏。',
    content: [
      '大多数创作者把写作当成结果，而不是流程。真正稳定的内容输出依赖可重复的仪式：输入、拆解、重组。',
      '输入阶段只收集高信号素材，例如书摘、真实对话、项目复盘，不做立刻输出。拆解阶段把素材拆成问题、观点、证据三层。重组阶段再按读者路径重排。',
      '这套方法能显著降低卡顿，因为你不是在空白页上“凭空创造”，而是在已有结构里完成编辑。'
    ],
    coverImage:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
    categoryId: 'c3',
    publishedAt: '2026-02-21',
    readingTime: 6,
    featured: true,
  },
  {
    id: 'p2',
    slug: 'editorial-grid-for-modern-blog',
    title: '现代博客的编辑式网格：内容层级如何被看见',
    summary: '布局不是装饰，它决定读者先读哪里、停多久、愿不愿继续。',
    content: [
      '一个优秀的博客首页必须回答三个问题：你是谁、你写什么、为什么值得读。网格系统是最稳定的答案。',
      '建议使用一个强主视觉区承接价值主张，再用两层卡片网格组织推荐与最新内容。推荐区强调深度，最新区强调时效。',
      '当视觉层级和信息层级一致时，读者会自然完成从浏览到深读的转换。'
    ],
    coverImage:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80',
    categoryId: 'c1',
    publishedAt: '2026-02-10',
    readingTime: 5,
    featured: true,
  },
  {
    id: 'p3',
    slug: 'react-content-architecture',
    title: 'React 内容型站点的最小架构：数据、路由与可扩展性',
    summary: '从一开始就把内容当成产品资产，后续扩展会轻松很多。',
    content: [
      '内容型站点常见问题不是“写不出页面”，而是“加内容后无法维护”。关键在于数据层抽象。',
      '建议将文章、分类、标签分离为独立数据源，再在查询层封装统计、归档、推荐逻辑。页面只消费结果，不处理业务细节。',
      '这种方式可以在未来无缝迁移到 CMS 或 API，而无需重写页面结构。'
    ],
    coverImage:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80',
    categoryId: 'c2',
    publishedAt: '2026-01-29',
    readingTime: 8,
    featured: false,
  },
  {
    id: 'p4',
    slug: 'building-personal-brand-through-notes',
    title: '笔记到品牌：如何把日常记录变成长期影响力',
    summary: '品牌不是口号，而是你持续输出后在他人心智中的稳定印象。',
    content: [
      '许多创作者把品牌理解成视觉识别，其实内容一致性更关键。你反复讨论的问题域，就是你的品牌边界。',
      '建立“主题簇”能让内容形成网络效应：每篇文章既独立成立，又互相引用，读者停留时间会明显提升。',
      '当你的内容从单篇走向体系，个人品牌才真正可累积。'
    ],
    coverImage:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1400&q=80',
    categoryId: 'c3',
    publishedAt: '2026-01-17',
    readingTime: 7,
    featured: false,
  },
]
