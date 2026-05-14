import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {
  private readonly store = inject(Store);

  readonly authUser = this.store.selectSignal(selectAuthUser);

  readonly role = 'Photographer';
  readonly bio = 'Lover of light and landscapes. Capturing moments one snap at a time.';
  readonly posts = 97;
  readonly followers = 1284;
  readonly following = 346;
}
