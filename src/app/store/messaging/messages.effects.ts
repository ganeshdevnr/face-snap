import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { MessagingService } from '../../services/messaging/messaging.service';
import { loadChannelsSuccess } from './channels.actions';
import { loadMessages, loadMessagesFailure, loadMessagesSuccess, messageReceived, selectConversation, sendMessage, sendMessageFailure, sendMessageSuccess } from './messages.actions';
import { selectMessagesForConversation } from './messages.selectors';

export class MessagesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly messagingService = inject(MessagingService);

  selectConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectConversation),
      switchMap(({ conversationId }) =>
        this.store.select(selectMessagesForConversation(conversationId)).pipe(
          take(1),
          switchMap((messages) =>
            messages.length === 0 ? of(loadMessages({ conversationId })) : EMPTY
          )
        )
      )
    )
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap(({ conversationId }) =>
        this.messagingService.getMessages(conversationId).pipe(
          map((messages) => loadMessagesSuccess({ conversationId, messages })),
          catchError((error) => of(loadMessagesFailure({ error: error.message })))
        )
      )
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      switchMap(({ message }) =>
        this.messagingService.sendMessage(message.conversationId, message.authorId, message.content).pipe(
          map((savedMessage) => sendMessageSuccess({ tempId: message.id, message: savedMessage })),
          catchError((error) => of(sendMessageFailure({
            tempId: message.id,
            conversationId: message.conversationId,
            error: error.message,
          })))
        )
      )
    )
  );

  listenForNewMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChannelsSuccess),
      switchMap(({ channels }) => {
        const conversationIds = channels.map((c) => c.conversationId);
        return this.messagingService.subscribeToAllMessages(conversationIds).pipe(
          map((message) => messageReceived({ message }))
        );
      })
    )
  );
}
