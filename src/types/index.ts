export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  likes: number;
  date: string;
  coverImage?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}
