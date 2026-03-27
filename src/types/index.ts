export interface Comment {
  id: string;
  articleId: string;
  user: string;
  content: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  likes: number;
  date: string;
  tags: string[];
}
