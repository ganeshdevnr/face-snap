import { Component, input } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-post-card',
  imports: [TimeAgoPipe],
  templateUrl: './post-card.html',
})
export class PostCardComponent {
  post = input.required<Post>();
}
