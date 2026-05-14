import { Component } from '@angular/core';
import { ChannelListComponent } from '../../features/channel-list/channel-list';

interface Message {
  id: number;
  text: string;
  mine: boolean;
}

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.html',
  imports: [ChannelListComponent],
})
export class MessagesPage {
  readonly messages: Message[] = [
    { id: 1, text: 'Hey! Loved your latest snap from New Zealand!', mine: false },
    { id: 2, text: 'Thank you so much! It was an incredible trip.', mine: true },
    { id: 3, text: 'The landscapes look absolutely breathtaking.', mine: false },
    { id: 4, text: 'They really are. You should visit sometime!', mine: true },
    { id: 5, text: 'Sounds great! See you then.', mine: false },
  ];
}
