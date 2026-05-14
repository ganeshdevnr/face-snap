import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChannelsState } from './channels.reducer';
import { selectSelectedConversationId } from './messages.selectors';

export const selectChannelsState = createFeatureSelector<ChannelsState>('channels');

export const selectChannels = createSelector(
  selectChannelsState,
  (state) => state.channels
);

export const selectChannelLoading = createSelector(
  selectChannelsState,
  (state) => state.channelsLoading
);

export const selectActiveChannel = createSelector(
  selectChannels,
  selectSelectedConversationId,
  (channels, selectedId) =>
    selectedId ? (channels.find((c) => c.conversationId === selectedId) ?? null) : null
);
