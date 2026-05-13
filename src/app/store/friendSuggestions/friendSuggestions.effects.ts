import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, forkJoin, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { SupabaseService } from "../../core/services/supabase.service";
import { selectAuthUser } from "../../store/auth/auth.selectors";
import {
  loadFriendSuggestions,
  loadFriendSuggestionsSuccess,
  loadFriendSuggestionsFailure,
  addFriendRequest,
  addFriendRequestSuccess,
  addFriendRequestFailure,
  cancelFriendRequest,
  cancelFriendRequestSuccess,
  cancelFriendRequestFailure,
} from "./friendSuggestions.actions";

export class FriendSuggestionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);  
  private readonly supabaseService = inject(SupabaseService);

  loadFriendSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriendSuggestions),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([, user]) =>
        forkJoin({
          users: this.supabaseService.getFriendSuggestions(),
          friendRequested: this.supabaseService.getFriendRequested(user!.id),
        }).pipe(
          map(({ users, friendRequested }) =>
            loadFriendSuggestionsSuccess({ users, friendRequested })
          ),
          catchError((error) =>
            of(loadFriendSuggestionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFriendRequest),
      withLatestFrom(this.store.select(selectAuthUser)),
      mergeMap(([{ friendId }, user]) =>
        this.supabaseService.addFriendRequest(user!.id, friendId).pipe(
          map(() => addFriendRequestSuccess({ friendId })),
          catchError((error) =>
            of(addFriendRequestFailure({ friendId, error: error.message }))
          )
        )
      )
    )
  );

  cancelFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelFriendRequest),
      withLatestFrom(this.store.select(selectAuthUser)),
      mergeMap(([{ friendId }, user]) =>
        this.supabaseService.cancelFriendRequest(user!.id, friendId).pipe(
          map(() => cancelFriendRequestSuccess({ friendId })),
          catchError((error) =>
            of(cancelFriendRequestFailure({ friendId, error: error.message }))
          )
        )
      )
    )
  );
}
