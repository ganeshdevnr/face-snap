import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { selectAuthIsLoading, selectAuthError } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormsModule, RouterLink],
})
export class LoginPage {
  private readonly store = inject(Store);

  readonly isLoading = this.store.selectSignal(selectAuthIsLoading);
  readonly error = this.store.selectSignal(selectAuthError);

  email = '';
  password = '';

  onSubmit(): void {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
