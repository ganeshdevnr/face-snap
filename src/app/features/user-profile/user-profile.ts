import { Component } from '@angular/core';

interface UserProfile {
  name: string;
  handle: string;
  role: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {
  readonly profile: UserProfile = {
    name: 'Nova Quinn',
    handle: '@novaquinn',
    role: 'Photographer',
    bio: 'Lover of light and landscapes. Capturing moments one snap at a time.',
    posts: 97,
    followers: 1284,
    following: 346,
  };
}
