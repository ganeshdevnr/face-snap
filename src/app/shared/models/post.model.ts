import { Author } from './author.model';

export interface Post {
  postId: string;
  author: Author;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  createdDate: Date;
}
