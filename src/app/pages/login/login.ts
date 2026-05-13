import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [FormsModule],
})
export class LoginPage {
  private readonly store = inject(Store);

  email = '';
  password = '';

  onSubmit(): void {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
