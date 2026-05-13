import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseService = inject(SupabaseService);

  return from(supabaseService.getSession()).pipe(
    switchMap((token) => {
      if (!token) return next(req);

      return next(req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      }));
    })
  );
};
