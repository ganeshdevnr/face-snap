import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  imports: [FormsModule, RouterLink],
})
export class SignUpPage {
  private readonly store = inject(Store);

  displayName = '';
  email = '';
  password = '';

  onSubmit(): void {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
