import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { postsReducer } from './store/posts/posts.reducer';
import { PostsEffects } from './store/posts/posts.effects';
import { friendSuggestionsReducer } from './store/friendSuggestions/friendSuggestions.reducer';
import { FriendSuggestionsEffects } from './store/friendSuggestions/friendSuggestions.effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { authInitializer } from './core/auth.initializer';
import { ChannelsEffects } from './store/messaging/channels.effects';
import { MessagesEffects } from './store/messaging/messages.effects';
import { channelsReducer } from './store/messaging/channels.reducer';
import { messagesReducer } from './store/messaging/messages.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore({ posts: postsReducer, friendSuggestions: friendSuggestionsReducer, auth: authReducer, channels: channelsReducer, messages: messagesReducer }),
    provideEffects([PostsEffects, FriendSuggestionsEffects, AuthEffects, ChannelsEffects, MessagesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAppInitializer(authInitializer),
  ],
};
