import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChannelListComponent } from '../../features/channel-list/channel-list';
import { Message } from '../../shared/models/message.model';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { selectActiveChannel } from '../../store/messaging/channels.selectors';
import { sendMessage } from '../../store/messaging/messages.actions';
import {
  selectMessagesError,
  selectMessagesLoading,
  selectSelectedConversationId,
  selectSelectedConversationMessages,
} from '../../store/messaging/messages.selectors';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.html',
  imports: [ChannelListComponent],
})
export class MessagesPage {
  private readonly store = inject(Store);

  readonly messages = this.store.selectSignal(selectSelectedConversationMessages);
  readonly isLoading = this.store.selectSignal(selectMessagesLoading);
  readonly error = this.store.selectSignal(selectMessagesError);
  readonly authUser = this.store.selectSignal(selectAuthUser);
  readonly selectedConversationId = this.store.selectSignal(selectSelectedConversationId);
  readonly activeChannel = this.store.selectSignal(selectActiveChannel);

  onSend(inputEl: HTMLInputElement): void {
    const content = inputEl.value.trim();
    const conversationId = this.selectedConversationId();
    const user = this.authUser();

    if (!content || !conversationId || !user) return;

    const message: Message = {
      id: crypto.randomUUID(),
      conversationId,
      authorId: user.id,
      content,
      status: 'sent',
      createdAt: new Date().toISOString(),
      uiStatus: 'pending',
    };

    this.store.dispatch(sendMessage({ message }));
    inputEl.value = '';
  }
}
