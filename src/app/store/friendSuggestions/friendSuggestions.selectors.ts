import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FriendSuggestionsState } from './friendSuggestions.reducer';

const selectFriendSuggestionsState = createFeatureSelector<FriendSuggestionsState>('friendSuggestions');

export const selectFriendSuggestions = createSelector(
  selectFriendSuggestionsState,
  (state) => state.users
);

export const selectFriendRequested = createSelector(
  selectFriendSuggestionsState,
  (state) => state.friendRequested
);

export const selectFriendSuggestionsWithRequestedState = createSelector(
  selectFriendSuggestions,
  selectFriendRequested,
  (users, friendRequested) =>
    users.map((user) => ({
      ...user,
      isRequested: friendRequested.includes(user.userId),
    }))
);

export const selectFriendSuggestionsIsLoading = createSelector(
  selectFriendSuggestionsState,
  (state) => state.isLoading
);

export const selectFriendSuggestionsError = createSelector(
  selectFriendSuggestionsState,
  (state) => state.error
);
