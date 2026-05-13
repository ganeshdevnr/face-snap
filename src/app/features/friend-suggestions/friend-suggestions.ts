import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadFriendSuggestions, addFriendRequest, cancelFriendRequest } from '../../store/friendSuggestions/friendSuggestions.actions';
import {
  selectFriendSuggestionsWithRequestedState,
  selectFriendSuggestionsIsLoading,
  selectFriendSuggestionsError,
} from '../../store/friendSuggestions/friendSuggestions.selectors';

@Component({
  selector: 'app-friend-suggestions',
  templateUrl: './friend-suggestions.html',
})
export class FriendSuggestionsComponent implements OnInit {
  private readonly store = inject(Store);

  readonly suggestions = this.store.selectSignal(selectFriendSuggestionsWithRequestedState);
  readonly isLoading = this.store.selectSignal(selectFriendSuggestionsIsLoading);
  readonly error = this.store.selectSignal(selectFriendSuggestionsError);

  ngOnInit(): void {
    this.store.dispatch(loadFriendSuggestions());
  }

  onAddFriend(friendId: number): void {
    this.store.dispatch(addFriendRequest({ friendId }));
  }

  onCancelFriendRequest(friendId: number): void {
    this.store.dispatch(cancelFriendRequest({ friendId }));
  }
}
