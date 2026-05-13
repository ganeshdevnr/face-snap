import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginPage } from './pages/login/login';
import { FeedPage } from './pages/feed/feed';
import { MessagesPage } from './pages/messages/messages';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'feed', component: FeedPage, canActivate: [authGuard] },
  { path: 'messages', component: MessagesPage, canActivate: [authGuard] },
];
