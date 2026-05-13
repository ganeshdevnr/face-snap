import { createReducer, on } from "@ngrx/store";
import { FriendSuggestion } from "../../shared/models/friend-suggestion.model";
import {
  loadFriendSuggestions,
  loadFriendSuggestionsSuccess,
  loadFriendSuggestionsFailure,
  addFriendRequest,
  addFriendRequestSuccess,
  addFriendRequestFailure,
  cancelFriendRequest,
  cancelFriendRequestSuccess,
  cancelFriendRequestFailure,
} from "./friendSuggestions.actions";


export interface FriendSuggestionsState {
  users: FriendSuggestion[];
  friendRequested: string[];
  isLoading: boolean;
  error: string | null;
}


export const initialFriendSuggestionsState: FriendSuggestionsState = {
  users: [],
  friendRequested: [],
  isLoading: false,
  error: null,
};


export const friendSuggestionsReducer = createReducer(
  initialFriendSuggestionsState,

  on(loadFriendSuggestions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(loadFriendSuggestionsSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    error: null,
  })),

  on(loadFriendSuggestionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Optimistic update: immediately mark as requested
  on(addFriendRequest, (state, { friendId }) => ({
    ...state,
    friendRequested: [...state.friendRequested, friendId],
  })),

  on(addFriendRequestSuccess, (state) => state),

  // Rollback optimistic update on failure
  on(addFriendRequestFailure, (state, { friendId, error }) => ({
    ...state,
    friendRequested: state.friendRequested.filter((id) => id !== friendId),
    error,
  })),

  // Optimistic update: immediately remove from requested
  on(cancelFriendRequest, (state, { friendId }) => ({
    ...state,
    friendRequested: state.friendRequested.filter((id) => id !== friendId),
  })),

  on(cancelFriendRequestSuccess, (state) => state),

  // Rollback optimistic update on failure
  on(cancelFriendRequestFailure, (state, { friendId, error }) => ({
    ...state,
    friendRequested: [...state.friendRequested, friendId],
    error,
  })),
);
