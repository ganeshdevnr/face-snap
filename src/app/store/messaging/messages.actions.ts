import { createAction, props } from '@ngrx/store';
import { Message } from '../../shared/models/message.model';

export const loadMessages = createAction(
  '[Messaging] Load Messages',
  props<{ conversationId: string; before?: string }>()
);

export const loadMessagesSuccess = createAction(
  '[Messaging] Load Messages Success',
  props<{ conversationId: string; messages: Message[] }>()
);

export const loadMessagesFailure = createAction(
  '[Messaging] Load Messages Failure',
  props<{ error: string }>()
);

export const selectConversation = createAction(
  '[Messaging] Select Conversation',
  props<{ conversationId: string }>()
);

export const sendMessage = createAction(
  '[Messaging] Send Message',
  props<{ message: Message }>()
);

export const sendMessageSuccess = createAction(
  '[Messaging] Send Message Success',
  props<{ tempId: string; message: Message }>()
);

export const sendMessageFailure = createAction(
  '[Messaging] Send Message Failure',
  props<{ tempId: string; conversationId: string; error: string }>()
);

export const deleteMessage = createAction(
  '[Messaging] Delete Message',
  props<{ conversationId: string; messageId: string }>()
);

export const deleteMessageSuccess = createAction(
  '[Messaging] Delete Message Success',
  props<{ conversationId: string; messageId: string }>()
);

export const deleteMessageFailure = createAction(
  '[Messaging] Delete Message Failure',
  props<{ error: string }>()
);

export const messageReceived = createAction(
  '[Messaging] Message Received',
  props<{ message: Message }>()
);

export const messageStatusUpdated = createAction(
  '[Messaging] Message Status Updated',
  props<{ conversationId: string; messageId: string; status: Message['status'] }>()
);
