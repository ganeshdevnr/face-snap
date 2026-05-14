import { createReducer, on } from '@ngrx/store';
import { Message } from '../../shared/models/message.model';
import {
  deleteMessageSuccess,
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  messageReceived,
  messageStatusUpdated,
  selectConversation,
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from './messages.actions';

export interface MessagesState {
  selectedConversationId: string | null;
  messages: { [conversationId: string]: Message[] };
  messagesLoading: boolean;
  messagesError: string | null;
}

export const initialMessagesState: MessagesState = {
  selectedConversationId: null,
  messages: {},
  messagesLoading: false,
  messagesError: null,
};

export const messagesReducer = createReducer(
  initialMessagesState,

  on(loadMessages, (state) => ({
    ...state,
    messagesLoading: true,
    messagesError: null,
  })),

  on(loadMessagesSuccess, (state, { conversationId, messages }) => ({
    ...state,
    messages: {
      ...state.messages,
      [conversationId]: [
        ...messages,
        ...(state.messages[conversationId] ?? []),
      ],
    },
    messagesLoading: false,
    messagesError: null,
  })),

  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    messagesLoading: false,
    messagesError: error,
  })),

  on(selectConversation, (state, { conversationId }) => ({
    ...state,
    selectedConversationId: conversationId,
  })),

  on(sendMessage, (state, { message }) => ({
    ...state,
    messages: {
      ...state.messages,
      [message.conversationId]: [
        ...(state.messages[message.conversationId] ?? []),
        message,
      ],
    },
  })),

  on(sendMessageSuccess, (state, { message }) => ({
    ...state,
    messages: {
      ...state.messages,
      [message.conversationId]: (state.messages[message.conversationId] ?? []).map((m) =>
        m.id === message.id ? { ...m, uiStatus: 'sent' as const } : m
      ),
    },
  })),

  on(sendMessageFailure, (state, { error }) => ({
    ...state,
    messagesError: error,
  })),

  on(deleteMessageSuccess, (state, { conversationId, messageId }) => ({
    ...state,
    messages: {
      ...state.messages,
      [conversationId]: (state.messages[conversationId] ?? []).filter(
        (m) => m.id !== messageId
      ),
    },
  })),

  on(messageReceived, (state, { message }) => ({
    ...state,
    messages: {
      ...state.messages,
      [message.conversationId]: [
        ...(state.messages[message.conversationId] ?? []),
        message,
      ],
    },
  })),

  on(messageStatusUpdated, (state, { conversationId, messageId, status }) => ({
    ...state,
    messages: {
      ...state.messages,
      [conversationId]: (state.messages[conversationId] ?? []).map((m) =>
        m.id === messageId ? { ...m, status } : m
      ),
    },
  }))
);
