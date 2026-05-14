import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState } from './messages.reducer';

export const selectMessagesState = createFeatureSelector<MessagesState>('messages');

export const selectSelectedConversationId = createSelector(
  selectMessagesState,
  (state) => state.selectedConversationId
);

export const selectMessagesForConversation = (conversationId: string) =>
  createSelector(
    selectMessagesState,
    (state) => state.messages[conversationId] ?? []
  );

export const selectMessagesLoading = createSelector(
  selectMessagesState,
  (state) => state.messagesLoading
);
