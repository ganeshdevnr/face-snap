import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../shared/models/auth-user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string; displayName: string }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: AuthUser }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
