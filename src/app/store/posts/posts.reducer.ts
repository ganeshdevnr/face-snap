import { createReducer, on } from '@ngrx/store';
import { Post } from '../../shared/models/post.model';
import { loadFeed, loadFeedFailure, loadFeedSuccess, loadNextPage } from './posts.actions';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  skip: number;
  total: number;
}

export const initialPostsState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  skip: 0,
  total: 0,
};

export const postsReducer = createReducer(
  initialPostsState,

  on(loadFeed, (state) => ({
    ...state,
    posts: [],
    skip: 0,
    total: 0,
    isLoading: true,
    error: null,
  })),

  on(loadFeedSuccess, (state, { posts, total }) => ({
    ...state,
    posts: [...state.posts, ...posts],
    skip: state.skip + posts.length,
    total,
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
