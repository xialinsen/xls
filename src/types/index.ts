export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  likes: number;
  createdAt: string;
  author: string;
  coverImage?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
}
