import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SupabaseService } from './services/supabase.service';
import { loginSuccess } from '../store/auth/auth.actions';

export async function authInitializer(): Promise<void> {
  const supabaseService = inject(SupabaseService);
  const store = inject(Store);

  const user = await supabaseService.getSessionUser();

  if (user) {
    store.dispatch(loginSuccess({
      user: {
        id: user.id,
        displayName: user.user_metadata?.['display_name'] ?? user.email.split('@')[0],
        avatarUrl: user.user_metadata?.['avatar_url'] ?? `https://i.pravatar.cc/150?u=${user.id}`,
      },
    }));
  }
}
