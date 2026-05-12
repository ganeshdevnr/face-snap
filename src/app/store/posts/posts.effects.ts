import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../features/posts/posts.service';
import { loadFeed, loadFeedSuccess, loadFeedFailure } from './posts.actions';

@Injectable()
export class PostsEffects {
  private readonly actions$ = inject(Actions);
  private readonly postsService = inject(PostsService);

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFeed),
      switchMap(() =>
        this.postsService.getFeed().pipe(
          map((posts) => loadFeedSuccess({ posts })),
          catchError((err: unknown) => {
            const message = err instanceof Error ? err.message : 'Failed to load feed';
            return of(loadFeedFailure({ error: message }));
          })
        )
      )
    )
  );
}
