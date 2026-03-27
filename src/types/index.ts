export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  tags: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
}
