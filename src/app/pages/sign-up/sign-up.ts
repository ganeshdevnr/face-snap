import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signup } from '../../store/auth/auth.actions';
import { selectAuthIsLoading, selectAuthError } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  imports: [FormsModule, RouterLink],
})
export class SignUpPage {
  private readonly store = inject(Store);

  readonly isLoading = this.store.selectSignal(selectAuthIsLoading);
  readonly error = this.store.selectSignal(selectAuthError);

  displayName = '';
  email = '';
  password = '';

  onSubmit(): void {
    this.store.dispatch(signup({ email: this.email, password: this.password, displayName: this.displayName }));
  }
}
