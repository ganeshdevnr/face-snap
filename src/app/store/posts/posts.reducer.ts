import { createReducer, on } from '@ngrx/store';
import { Post } from '../../shared/models/post.model';
import { loadFeed, loadFeedFailure, loadFeedSuccess, loadNextPage } from './posts.actions';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

export const initialPostsState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialPostsState,

  on(loadFeed, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(loadFeedSuccess, (state, { posts }) => ({
    ...state,
    posts: [...state.posts, ...posts],
    isLoading: false,
    error: null,
  })),

  on(loadFeedFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(loadNextPage, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  }))
);
