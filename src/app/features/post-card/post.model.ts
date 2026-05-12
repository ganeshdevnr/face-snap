export interface Post {
  id: number;
  author: {
    name: string;
    handle: string;
    verified: boolean;
  };
  content: string;
  hasImage: boolean;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}
