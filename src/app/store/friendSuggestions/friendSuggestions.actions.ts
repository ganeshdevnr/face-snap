import { createAction, props } from '@ngrx/store';
import { Friend } from '../../shared/models/friend.model';

export const loadFriendSuggestions = createAction('[Friend Suggestions] Load Friend Suggestions');

export const loadFriendSuggestionsSuccess = createAction(
  '[Friend Suggestions] Load Friend Suggestions Success',
  props<{ users: Friend[]; friendRequested: string[] }>()
);

export const loadFriendSuggestionsFailure = createAction(
  '[Friend Suggestions] Load Friend Suggestions Failure',
  props<{ error: string }>()
);

export const addFriendRequest = createAction(
  '[Friend Suggestions] Add Friend Request',
  props<{ friendId: string }>()
);

export const addFriendRequestSuccess = createAction(
  '[Friend Suggestions] Add Friend Request Success',
  props<{ friendId: string }>()
);

export const addFriendRequestFailure = createAction(
  '[Friend Suggestions] Add Friend Request Failure',
  props<{ friendId: string; error: string }>()
);

export const cancelFriendRequest = createAction(
  '[Friend Suggestions] Cancel Friend Request',
  props<{ friendId: string }>()
);

export const cancelFriendRequestSuccess = createAction(
  '[Friend Suggestions] Cancel Friend Request Success',
  props<{ friendId: string }>()
);

export const cancelFriendRequestFailure = createAction(
  '[Friend Suggestions] Cancel Friend Request Failure',
  props<{ friendId: string; error: string }>()
);
