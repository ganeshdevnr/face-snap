import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap, tap } from 'rxjs';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { AuthUser } from '../../shared/models/auth-user.model';

export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email }) => {
        const mockUser: AuthUser = {
          id: 1,
          displayName: email.split('@')[0],
          avatarUrl: 'https://i.pravatar.cc/150?u=1',
        };

        return of(loginSuccess({ user: mockUser })).pipe(
          catchError((error) => of(loginFailure({ error: error.message })))
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/feed']))
      ),
    { dispatch: false }
  );
}
