import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChannelsState } from './channels.reducer';

export const selectChannelsState = createFeatureSelector<ChannelsState>('channels');

export const selectChannels = createSelector(
  selectChannelsState,
  (state) => state.channels
);

export const selectChannelLoading = createSelector(
  selectChannelsState,
  (state) => state.channelsLoading
);
