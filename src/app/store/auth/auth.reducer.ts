import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../../shared/models/auth-user.model';
import { login, loginSuccess, loginFailure } from './auth.actions';

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
  })),

  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
