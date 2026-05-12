import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.isLoading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);

export const selectPostsCount = createSelector(
  selectPosts,
  (posts) => posts.length
);

export const selectPostsSkip = createSelector(
  selectPostsState,
  (state) => state.skip
);

export const selectHasMorePosts = createSelector(
  selectPostsState,
  (state) => state.posts.length < state.total
);
