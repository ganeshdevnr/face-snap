import { createAction, props } from '@ngrx/store';
import { Post } from '../../shared/models/post.model';

export const loadFeed = createAction('[Posts] Load Feed');

export const loadFeedSuccess = createAction(
  '[Posts] Load Feed Success',
  props<{ posts: Post[]; total: number }>()
);

export const loadFeedFailure = createAction(
  '[Posts] Load Feed Failure',
  props<{ error: string }>()
);

export const loadNextPage = createAction('[Posts] Load Next Page');
