import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
