import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { postsReducer } from './store/posts/posts.reducer';
import { PostsEffects } from './store/posts/posts.effects';
import { friendSuggestionsReducer } from './store/friendSuggestions/friendSuggestions.reducer';
import { FriendSuggestionsEffects } from './store/friendSuggestions/friendSuggestions.effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { authInitializer } from './core/auth.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({ posts: postsReducer, friendSuggestions: friendSuggestionsReducer, auth: authReducer }),
    provideEffects([PostsEffects, FriendSuggestionsEffects, AuthEffects]),
    { provide: APP_INITIALIZER, useFactory: authInitializer, multi: true },
  ],
};
