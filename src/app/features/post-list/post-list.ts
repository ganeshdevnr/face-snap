import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostCardComponent } from '../post-card/post-card';
import { loadFeed } from '../../store/posts/posts.actions';
import { selectPosts, selectPostsError, selectPostsLoading } from '../../store/posts/posts.selectors';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent],
  templateUrl: './post-list.html',
})
export class PostListComponent {
  private readonly store = inject(Store);

  readonly posts = this.store.selectSignal(selectPosts);
  readonly isLoading = this.store.selectSignal(selectPostsLoading);
  readonly error = this.store.selectSignal(selectPostsError);

  constructor() {
    this.store.dispatch(loadFeed());
  }
}
