import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FriendSuggestion } from '../../shared/models/friend-suggestion.model';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  getFriendRequested(userId: string): Observable<string[]> {
    return from(
      this.supabase.from('friend_requests').select('friend_id').eq('user_id', userId)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => row.friend_id);
      })
    );
  }

  getFriendSuggestions(): Observable<FriendSuggestion[]> {
    return from(
      this.supabase.from('profiles').select('user_id, display_name, avatar_url').limit(10)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((profile) => ({
          userId: profile.user_id,
          name: profile.display_name,
          avatarUrl: profile.avatar_url,
          handle: profile.user_id,
        }));
      })
    );
  }

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

  cancelFriendRequest(userId: string, friendId: string): Observable<any> {
    return from(
      this.supabase.from('friend_requests')
        .delete()
        .eq('user_id', userId)
        .eq('friend_id', friendId)
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
