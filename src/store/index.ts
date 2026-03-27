import { create } from 'zustand';
import { Article, Comment } from '../types';
import { mockArticles, mockComments } from '../data/mock';

interface BlogStore {
  articles: Article[];
  comments: Comment[];
  searchQuery: string;
  activeTag: string | null;
  setSearchQuery: (query: string) => void;
  setActiveTag: (tag: string | null) => void;
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  articles: mockArticles,
  comments: mockComments,
  searchQuery: '',
  activeTag: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTag: (tag) => set({ activeTag: tag }),
  addComment: (newComment) => set((state) => {
    const comment: Comment = {
      ...newComment,
      id: `c_${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    return { comments: [...state.comments, comment] };
  }),
}));
