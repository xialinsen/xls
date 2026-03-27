import { create } from 'zustand';
import { Article, Comment } from '../types';
import { mockArticles, mockComments } from '../data/mock';

interface BlogStore {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
  likeArticle: (articleId: string) => void;
  getArticleById: (id: string) => Article | undefined;
  getCommentsByArticleId: (articleId: string) => Comment[];
  getAllTags: () => string[];
}

export const useStore = create<BlogStore>((set, get) => ({
  articles: mockArticles,
  comments: mockComments,
  searchQuery: '',
  selectedTag: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedTag: (tag) => set({ selectedTag: tag }),

  addComment: (comment) => set((state) => ({
    comments: [
      ...state.comments,
      {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
      }
    ]
  })),

  likeArticle: (articleId) => set((state) => ({
    articles: state.articles.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 }
        : article
    )
  })),

  getArticleById: (id) => get().articles.find(a => a.id === id),
  
  getCommentsByArticleId: (articleId) => get().comments.filter(c => c.articleId === articleId),
  
  getAllTags: () => {
    const tags = new Set<string>();
    get().articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }
}));
