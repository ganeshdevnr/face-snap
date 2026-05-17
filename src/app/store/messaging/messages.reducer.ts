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
        { ...message, uiStatus: 'pending' as const },
        ...(state.messages[message.conversationId] ?? []),
      ],
    },
  })),

  on(sendMessageSuccess, (state, { tempId, message }) => ({
    ...state,
    messages: {
      ...state.messages,
      [message.conversationId]: (state.messages[message.conversationId] ?? []).map((m) =>
        m.id === tempId ? { ...message, uiStatus: 'sent' as const } : m
      ),
    },
  })),

  on(sendMessageFailure, (state, { tempId, conversationId, error }) => ({
    ...state,
    messages: {
      ...state.messages,
      [conversationId]: (state.messages[conversationId] ?? []).map((m) =>
        m.id === tempId ? { ...m, uiStatus: 'failed' as const } : m
      ),
    },
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

  on(messageReceived, (state, { message }) => {
    // Dedup: skip if already present (e.g. own message echoed back via Supabase real-time)
    const existing = state.messages[message.conversationId];
    if (existing?.some(m => m.id === message.id)) {
      return state;
    }
    return {
      ...state,
      messages: {
        ...state.messages,
        [message.conversationId]: [message, ...(existing ?? [])],
      },
    };
  }),

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
