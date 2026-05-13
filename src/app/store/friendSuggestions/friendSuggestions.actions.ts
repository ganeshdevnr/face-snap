import { createAction, props } from '@ngrx/store';
import { FriendSuggestion } from '../../shared/models/friend-suggestion.model';

export const loadFriendSuggestions = createAction('[Friend Suggestions] Load Friend Suggestions');

export const loadFriendSuggestionsSuccess = createAction(
  '[Friend Suggestions] Load Friend Suggestions Success',
  props<{ users: FriendSuggestion[] }>()
);

export const loadFriendSuggestionsFailure = createAction(
  '[Friend Suggestions] Load Friend Suggestions Failure',
  props<{ error: string }>()
);

export const addFriendRequest = createAction(
  '[Friend Suggestions] Add Friend Request',
  props<{ friendId: number }>()
);

export const addFriendRequestSuccess = createAction(
  '[Friend Suggestions] Add Friend Request Success',
  props<{ friendId: number }>()
);

export const addFriendRequestFailure = createAction(
  '[Friend Suggestions] Add Friend Request Failure',
  props<{ friendId: number; error: string }>()
);

export const cancelFriendRequest = createAction(
  '[Friend Suggestions] Cancel Friend Request',
  props<{ friendId: number }>()
);

export const cancelFriendRequestSuccess = createAction(
  '[Friend Suggestions] Cancel Friend Request Success',
  props<{ friendId: number }>()
);

export const cancelFriendRequestFailure = createAction(
  '[Friend Suggestions] Cancel Friend Request Failure',
  props<{ friendId: number; error: string }>()
);
