import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadChannels } from '../../store/messaging/channels.actions';
import { selectChannelLoading, selectChannels } from '../../store/messaging/channels.selectors';
import { selectConversation } from '../../store/messaging/messages.actions';
import { selectSelectedConversationId } from '../../store/messaging/messages.selectors';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.html',
  imports: [TimeAgoPipe],
  host: { class: 'flex flex-col flex-1 min-h-0' },
})
export class ChannelListComponent implements OnInit {
  private readonly store = inject(Store);

  readonly channels = this.store.selectSignal(selectChannels);
  readonly isLoading = this.store.selectSignal(selectChannelLoading);
  readonly selectedConversationId = this.store.selectSignal(selectSelectedConversationId);

  ngOnInit(): void {
    this.store.dispatch(loadChannels());
  }

  onSelect(conversationId: string): void {
    this.store.dispatch(selectConversation({ conversationId }));
  }
}
