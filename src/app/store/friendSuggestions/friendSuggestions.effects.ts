import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { FriendSuggestionsService } from "../../services/friend-suggestions/friend-suggestions.service";
import {
  loadFriendSuggestions,
  loadFriendSuggestionsSuccess,
  loadFriendSuggestionsFailure,
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
}
