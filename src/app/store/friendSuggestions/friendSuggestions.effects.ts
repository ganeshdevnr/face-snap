import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { FriendSuggestionsService } from "../../services/friend-suggestions/friend-suggestions.service";
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
  private readonly friendSuggestionsService = inject(FriendSuggestionsService);

  loadFriendSuggestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFriendSuggestions),
      switchMap(() =>
        this.friendSuggestionsService.getFriendSuggestions().pipe(
          map((users) => loadFriendSuggestionsSuccess({ users })),
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
      mergeMap(({ friendId }) =>
        this.friendSuggestionsService.addFriendRequest(friendId).pipe(
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
      mergeMap(({ friendId }) =>
        this.friendSuggestionsService.cancelFriendRequest(friendId).pipe(
          map(() => cancelFriendRequestSuccess({ friendId })),
          catchError((error) =>
            of(cancelFriendRequestFailure({ friendId, error: error.message }))
          )
        )
      )
    )
  );
}
