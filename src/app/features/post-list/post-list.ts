import { Component } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card';
import { Post } from '../post-card/post.model';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent],
  templateUrl: './post-list.html',
})
export class PostListComponent {
  readonly posts: Post[] = [
    {
      id: 1,
      author: { name: 'Aurelia Thorne', handle: '@aureliat', verified: true },
      content: 'Exploring the beautiful landscapes of New Zealand! #wanderlust',
      hasImage: false,
      likes: 20,
      comments: 3,
      shares: 5,
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      author: { name: 'Zander Hawke', handle: '@zanderhawk', verified: true },
      content: 'Just finished a new digital painting. Thoughts?',
      hasImage: true,
      likes: 50,
      comments: 10,
      shares: 15,
      timeAgo: '4 hours ago',
    },
    {
      id: 3,
      author: { name: 'Liora Solara', handle: '@liora_s', verified: true },
      content: 'Had an amazing time at the tech conference last week!',
      hasImage: false,
      likes: 30,
      comments: 5,
      shares: 2,
      timeAgo: '5 hours ago',
    },
    {
      id: 4,
      author: { name: 'Cassian Ember', handle: '@cassian_ember', verified: false },
      content: 'Captured this stunning sunset over the city skyline.',
      hasImage: true,
      likes: 40,
      comments: 7,
      shares: 8,
      timeAgo: '6 hours ago',
    },
  ];
}
