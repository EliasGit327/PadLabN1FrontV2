import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  user: User;

  authorize(user: User) {
    this.user = user;
  }

  isAuthorized(): boolean {
    return !!this.user;
  }

  getUserName(userName: string) {
    return this.httpClient.get<User>(`api/userswithsubs/${userName}`);
  }

  getUser(): User {
    return this.user;
  }

  pushSub(subOnId: number) {
    this.user.subs.push(subOnId);
  }

  removeSub(subOnId: number) {
    this.user.subs.splice(this.user.subs.indexOf(subOnId), 1);
  }
}
