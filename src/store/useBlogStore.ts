import { create } from 'zustand';
import { Article, Comment } from '../types';
import { mockArticles, mockComments } from '../data/mockData';

interface BlogState {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
  getFilteredArticles: () => Article[];
  getTopLikedArticle: () => Article | null;
  getArticleById: (id: string) => Article | undefined;
  getCommentsByArticleId: (id: string) => Comment[];
  getAllTags: () => string[];
}

export const useBlogStore = create<BlogState>((set, get) => ({
  articles: mockArticles,
  comments: mockComments,
  searchQuery: '',
  selectedTag: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedTag: (tag) => set({ selectedTag: tag }),

  addComment: (commentData) => set((state) => {
    const newComment: Comment = {
      ...commentData,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    return { comments: [...state.comments, newComment] };
  }),

  getFilteredArticles: () => {
    const { articles, searchQuery, selectedTag } = get();
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  },

  getTopLikedArticle: () => {
    const { articles } = get();
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => b.likes - a.likes)[0];
  },

  getArticleById: (id) => {
    return get().articles.find(a => a.id === id);
  },

  getCommentsByArticleId: (id) => {
    return get().comments.filter(c => c.articleId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getAllTags: () => {
    const tagsSet = new Set<string>();
    get().articles.forEach(article => {
      article.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }
}));
