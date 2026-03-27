export interface Comment {
  id: string;
  articleId: string;
  username: string;
  content: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  likes: number;
  date: string;
  tags: string[];
}
