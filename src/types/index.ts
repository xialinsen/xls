export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  likes: number;
  tags: string[];
  date: string;
  readTime: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
}
