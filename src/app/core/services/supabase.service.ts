import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  getSession(): Promise<any> {
    return this.supabase.auth.getSession();
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
