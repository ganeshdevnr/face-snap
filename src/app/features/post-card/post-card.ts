import { Component, input } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.html',
})
export class PostCardComponent {
  post = input.required<Post>();
}
