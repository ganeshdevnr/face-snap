import { createAction, props } from '@ngrx/store';
import { Channel } from '../../shared/models/channel.model';

export const loadChannels = createAction('[Messaging] Load Channels');

export const loadChannelsSuccess = createAction(
  '[Messaging] Load Channels Success',
  props<{ channels: Channel[] }>()
);

export const loadChannelsFailure = createAction(
  '[Messaging] Load Channels Failure',
  props<{ error: string }>()
);
