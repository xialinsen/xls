export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  likes: number;
  date: string;
  author: string;
  coverImage?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  username: string;
  content: string;
  date: string;
}
