import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { MOCK_USERS } from '../data/mock-users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _users = signal<User[]>(MOCK_USERS);

  readonly users = this._users.asReadonly();
  readonly count = computed(() => this._users().length);

  getById(id: string) {
    return computed(() => this._users().find((u) => u.id === id));
  }

  getUsersByIds(ids: string[]) {
    return computed(() => this._users().filter((u) => ids.includes(u.id)));
  }
}
