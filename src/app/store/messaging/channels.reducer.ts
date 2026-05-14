import { createReducer, on } from '@ngrx/store';
import { Channel } from '../../shared/models/channel.model';
import { loadChannels, loadChannelsFailure, loadChannelsSuccess } from './channels.actions';

export interface ChannelsState {
  channels: Channel[];
  channelsLoading: boolean;
  channelsError: string | null;
}

export const initialChannelsState: ChannelsState = {
  channels: [],
  channelsLoading: false,
  channelsError: null,
};

export const channelsReducer = createReducer(
  initialChannelsState,

  on(loadChannels, (state) => ({
    ...state,
    channelsLoading: true,
    channelsError: null,
  })),

  on(loadChannelsSuccess, (state, { channels }) => ({
    ...state,
    channels,
    channelsLoading: false,
    channelsError: null,
  })),

  on(loadChannelsFailure, (state, { error }) => ({
    ...state,
    channelsLoading: false,
    channelsError: error,
  }))
);
