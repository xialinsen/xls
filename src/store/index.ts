import { create } from 'zustand';
import { Article, Comment } from '../types';
import { mockArticles, mockComments } from '../utils/mockData';

interface AppState {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  selectedTag: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
}

export const useStore = create<AppState>((set) => ({
  articles: mockArticles,
  comments: mockComments,
  searchQuery: '',
  selectedTag: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  addComment: (comment) => set((state) => {
    const newComment: Comment = {
      ...comment,
      id: `c${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    return { comments: [...state.comments, newComment] };
  }),
}));
