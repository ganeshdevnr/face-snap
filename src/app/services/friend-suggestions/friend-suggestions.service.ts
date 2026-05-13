import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { FriendSuggestion } from '../../shared/models/friend-suggestion.model';

interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface DummyJsonResponse {
  users: DummyJsonUser[];
}

@Injectable({ providedIn: 'root' })
export class FriendSuggestionsService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://dummyjson.com/users?limit=10&select=id,firstName,lastName,username';

  addFriendRequest(friendId: number): Observable<void> {
    return this.http.put(`https://dummyjson.com/users/${friendId}`, { friendId }).pipe(
      switchMap(() =>
        Math.random() < 0.5
          ? throwError(() => new Error('Failed to send friend request'))
          : new Observable<void>((obs) => { obs.next(); obs.complete(); })
      )
    );
  }

  cancelFriendRequest(friendId: number): Observable<void> {
    return this.http.put(`https://dummyjson.com/users/${friendId}`, { friendId }).pipe(
      switchMap(() =>
        Math.random() < 0.5
          ? throwError(() => new Error('Failed to cancel friend request'))
          : new Observable<void>((obs) => { obs.next(); obs.complete(); })
      )
    );
  }

  getFriendSuggestions(): Observable<FriendSuggestion[]> {
    return this.http.get<DummyJsonResponse>(this.url).pipe(
      map(({ users }) =>
        users.map((user) => ({
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          handle: user.username,
          avatarUrl: 'https://i.pravatar.cc/150?u=' + user.id,
        }))
      )
    );
  }
}
