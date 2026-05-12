import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PostCardComponent } from '../post-card/post-card';
import { loadFeed, loadNextPage } from '../../store/posts/posts.actions';
import {
  selectHasMorePosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
} from '../../store/posts/posts.selectors';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent],
  templateUrl: './post-list.html',
  host: { class: 'block' },
})
export class PostListComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sentinelEl = viewChild.required<ElementRef<HTMLDivElement>>('sentinel');

  readonly posts = this.store.selectSignal(selectPosts);
  readonly isLoading = this.store.selectSignal(selectPostsLoading);
  readonly error = this.store.selectSignal(selectPostsError);
  readonly hasMore = this.store.selectSignal(selectHasMorePosts);

  private observer: IntersectionObserver | null = null;
  private sentinel: HTMLDivElement | null = null;

  constructor() {
    this.store.dispatch(loadFeed());

    afterNextRender(() => {
      this.sentinel = this.sentinelEl().nativeElement;

      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.isLoading() && this.hasMore()) {
            this.store.dispatch(loadNextPage());
          }
        },
        { rootMargin: '200px' }
      );

      this.observer.observe(this.sentinel);
      this.destroyRef.onDestroy(() => this.observer?.disconnect());
    });

    // After each page load completes, re-observe the sentinel so the
    // observer fires with the current viewport state. This handles the
    // case where the sentinel is still visible after new posts are rendered.
    effect(() => {
      if (!this.isLoading() && this.observer && this.sentinel) {
        this.observer.unobserve(this.sentinel);
        this.observer.observe(this.sentinel);
      }
    });
  }
}
