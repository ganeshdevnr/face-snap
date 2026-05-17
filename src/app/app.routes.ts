import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginPage } from './pages/login/login';
import { SignUpPage } from './pages/sign-up/sign-up';
import { FeedPage } from './pages/feed/feed';
import { MessagesPage } from './pages/messages/messages';
import { FriendsPage } from './pages/friends/friends';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'feed', component: FeedPage, canActivate: [authGuard] },
  { path: 'messages', component: MessagesPage, canActivate: [authGuard] },
  { path: 'friends', component: FriendsPage, canActivate: [authGuard] },
  { path: 'contact', component: ContactPage, canActivate: [authGuard] },
];
