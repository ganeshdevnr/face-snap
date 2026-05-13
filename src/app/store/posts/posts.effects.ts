import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { loadFeed, loadFeedSuccess, loadFeedFailure, loadNextPage } from './posts.actions';
import { selectPostsSkip } from './posts.selectors';

@Injectable()
export class PostsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly postsService = inject(PostsService);

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFeed),
      exhaustMap(() =>
        this.postsService.getFeed(0, 10).pipe(
          map(({ posts, total }) => loadFeedSuccess({ posts, total })),
          catchError((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load feed';
            return of(loadFeedFailure({ error: message }));
          })
        )
      )
    )
  );

  loadNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNextPage),
      withLatestFrom(this.store.select(selectPostsSkip)),
      exhaustMap(([, skip]) =>
        this.postsService.getFeed(skip, 10).pipe(
          map(({ posts, total }) => loadFeedSuccess({ posts, total })),
          catchError((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load feed';
            return of(loadFeedFailure({ error: message }));
          })
        )
      )
    )
  );
}
