import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../../shared/models/post.model';

interface DummyJsonPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}

interface DummyJsonResponse {
  posts: DummyJsonPost[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly feedUrl = 'https://dummyjson.com/posts';

  getFeed(): Observable<Post[]> {
    return this.http.get<DummyJsonResponse>(this.feedUrl).pipe(
      map(({ posts }) => posts.map((p) => this.mapToPost(p)))
    );
  }

  private mapToPost(p: DummyJsonPost): Post {
    return {
      postId: p.id.toString(),
      author: {
        authorId: p.userId.toString(),
        name: 'User ' + p.userId,
        avatarUrl: 'https://i.pravatar.cc/150?u=' + p.userId,
      },
      content: p.body,
      likes: p.reactions.likes,
      comments: Math.floor(Math.random() * 51),
      shares: Math.floor(Math.random() * 31),
      createdDate: new Date(),
    };
  }
}
