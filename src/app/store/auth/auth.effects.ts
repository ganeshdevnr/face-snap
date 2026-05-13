import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { login, loginSuccess, loginFailure, logout, signup, signupSuccess, signupFailure } from './auth.actions';
import { SupabaseService } from '../../core/services/supabase.service';

export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly supabaseService = inject(SupabaseService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.supabaseService.login(email, password).pipe(
          map(({ data, error }) => {
            if (error) return loginFailure({ error: error.message });
            const { user } = data;
            return loginSuccess({
              user: {
                id: user.id,
                displayName: user.user_metadata?.['display_name'] ?? email.split('@')[0],
                avatarUrl: user.user_metadata?.['avatar_url'] ?? `https://i.pravatar.cc/150?u=${user.id}`,
              },
            });
          }),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
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

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap(({ email, password, displayName }) =>
        this.supabaseService.signUp(email, password, displayName).pipe(
          map(({ data, error }) => {

            console.log(data, error);

            if (error) return signupFailure({ error: error.message });
            const { user } = data;
            return signupSuccess({
              user: {
                id: user.id,
                displayName: user.user_metadata?.['display_name'] ?? user.email.split('@')[0],
                avatarUrl: `https://i.pravatar.cc/150?u=${user.id}`,
              },
            });
          }),
          catchError((error) => of(signupFailure({ error: error.message })))
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupSuccess),
        tap(() => this.router.navigate(['/feed']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
