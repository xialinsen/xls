export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  likes: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
}
