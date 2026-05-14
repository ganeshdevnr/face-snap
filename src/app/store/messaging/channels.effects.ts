import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { MessagingService } from '../../services/messaging/messaging.service';
import { selectAuthUser } from '../auth/auth.selectors';
import { loadChannels, loadChannelsFailure, loadChannelsSuccess } from './channels.actions';

export class ChannelsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly messagingService = inject(MessagingService);

  loadChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChannels),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([, user]) =>
        this.messagingService.getChannels(user!.id).pipe(
          map((channels) => loadChannelsSuccess({ channels })),
          catchError((error) => of(loadChannelsFailure({ error: error.message })))
        )
      )
    )
  );
}
