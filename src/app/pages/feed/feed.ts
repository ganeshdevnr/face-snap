import { Component } from '@angular/core';
import { UserProfileComponent } from '../../features/user-profile/user-profile';
import { PostListComponent } from '../../features/post-list/post-list';
import { FriendSuggestionsComponent } from '../../features/friend-suggestions/friend-suggestions';

@Component({
  selector: 'app-feed-page',
  imports: [UserProfileComponent, PostListComponent, FriendSuggestionsComponent],
  templateUrl: './feed.html',
})
export class FeedPage {}
