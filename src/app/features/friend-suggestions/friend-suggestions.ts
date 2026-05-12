import { Component } from '@angular/core';

interface FriendSuggestion {
  id: number;
  name: string;
  handle: string;
  mutualFriends: number;
}

@Component({
  selector: 'app-friend-suggestions',
  templateUrl: './friend-suggestions.html',
})
export class FriendSuggestionsComponent {
  readonly suggestions: FriendSuggestion[] = [
    { id: 1, name: 'Jason Bueller', handle: '@jasonb', mutualFriends: 3 },
    { id: 2, name: 'Ember Franklin', handle: '@emberf', mutualFriends: 5 },
    { id: 3, name: 'Jaxon Storm', handle: '@jaxstorm', mutualFriends: 2 },
    { id: 4, name: 'Aria Blaze', handle: '@ariablaze', mutualFriends: 7 },
    { id: 5, name: 'Orion Sky', handle: '@orionsky', mutualFriends: 1 },
    { id: 6, name: 'Jessica Lee', handle: '@jessical', mutualFriends: 4 },
  ];
}
