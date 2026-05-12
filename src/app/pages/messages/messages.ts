import { Component } from '@angular/core';

interface Conversation {
  id: number;
  name: string;
  time: string;
  lastMessage: string;
  active: boolean;
  unread?: number;
}

interface Message {
  id: number;
  text: string;
  mine: boolean;
}

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages.html',
})
export class MessagesPage {
  readonly conversations: Conversation[] = [
    { id: 1, name: 'Ember Franklin', time: '2m ago', lastMessage: 'Sounds great! See you then.', active: true, unread: 2 },
    { id: 2, name: 'Zander Hawke', time: '1h ago', lastMessage: 'Did you see my latest post?', active: false },
    { id: 3, name: 'Aria Blaze', time: '3h ago', lastMessage: 'Love your photos!', active: false },
    { id: 4, name: 'Orion Sky', time: 'Yesterday', lastMessage: 'Thanks for the tip!', active: false },
    { id: 5, name: 'Jason Bueller', time: 'Mon', lastMessage: 'Are you going to the event?', active: false },
  ];

  readonly messages: Message[] = [
    { id: 1, text: 'Hey! Loved your latest snap from New Zealand!', mine: false },
    { id: 2, text: 'Thank you so much! It was an incredible trip.', mine: true },
    { id: 3, text: 'The landscapes look absolutely breathtaking.', mine: false },
    { id: 4, text: 'They really are. You should visit sometime!', mine: true },
    { id: 5, text: 'Sounds great! See you then.', mine: false },
  ];
}
