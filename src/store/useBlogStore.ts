import { create } from 'zustand';
import { Article, Comment } from '../types';
import { initialArticles, initialComments } from './mockData';

interface BlogState {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  likeArticle: (articleId: string) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  articles: initialArticles,
  comments: initialComments,
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
      },
    ],
  })),

  likeArticle: (articleId) => set((state) => ({
    articles: state.articles.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 }
        : article
    )
  })),
}));
