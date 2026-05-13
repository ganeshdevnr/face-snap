import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  async getSession(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data?.session?.access_token ?? null;
  }

  addFriendRequest(userId: string, friendId: string): Observable<any> {
    return from(
      this.supabase.from('friend_requests').insert({ user_id: userId, friend_id: friendId, status: 'pending' })
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  async getSessionUser(): Promise<any> {
    const { data } = await this.supabase.auth.getSession();
    return data?.session?.user ?? null;
  }

  login(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  signUp(email: string, password: string, displayName: string): Observable<any> {
    return from(this.supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    }));
  }
}
