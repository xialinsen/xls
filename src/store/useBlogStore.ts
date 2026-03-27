import { create } from 'zustand';
import { Article, Comment } from '../types';
import { mockArticles } from '../utils/mockData';

interface BlogState {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  getFilteredArticles: () => Article[];
  getTopArticle: () => Article | null;
  getAllTags: () => string[];
}

export const useBlogStore = create<BlogState>((set, get) => ({
  articles: mockArticles,
  comments: [
    {
      id: 'c1',
      articleId: '1',
      author: 'CyberPunk_01',
      content: '这篇文章写得太棒了，对并发渲染的解释非常清晰！',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'c2',
      articleId: '3',
      author: 'AI_Enthusiast',
      content: '完全同意，AI 确实是提升效率的利器。',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ],
  searchQuery: '',
  selectedTag: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),

  addComment: (commentData) => set((state) => ({
    comments: [
      ...state.comments,
      {
        ...commentData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      }
    ]
  })),

  getFilteredArticles: () => {
    const { articles, searchQuery, selectedTag } = get();
    return articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  },

  getTopArticle: () => {
    const { articles } = get();
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  },

  getAllTags: () => {
    const { articles } = get();
    const tagsSet = new Set<string>();
    articles.forEach(article => article.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }
}));
