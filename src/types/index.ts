export interface Article {
  id: string;
  title: string;
  abstract: string;
  content: string;
  likes: number;
  tags: string[];
  date: string;
  readTime: number;
  author: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
}
