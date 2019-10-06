import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { SubForCreation } from '../../models/SubForCreation';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.refreshUserList();
  }

  refreshUserList() {
    this.http.get<User[]>('api/userswithsubs/').subscribe(data => this.users = data);
  }

  subscribe(subIdIn: number, subOnIdIn: number) {
    const newSub: SubForCreation = {
      subId: subIdIn,
      subOnId: subOnIdIn
    };

    if (subIdIn > 0 && subOnIdIn > 0) {
      this.http.post(`api/subs`, newSub)
        .subscribe(() => {
            this.authService.pushSub(subOnIdIn);
            this.refreshUserList();
          },
          (error: HttpErrorResponse) => {
            // this.subUserMessage = 'Already subscribed';
          });
    }
  }

  unsubscribe(subIdIn: number, subOnIdIn: number) {

    this.http.delete(`api/subs/${subIdIn}/${subOnIdIn}`)
      .subscribe(() => {
        this.authService.removeSub(subOnIdIn);
        this.refreshUserList();
      }, (error: HttpErrorResponse) => {
        // this.subUserMessage = 'No sub found';
      });
  }

  deleteUser(userId: number) {
    this.http.delete(`api/users/${userId}`)
      .subscribe(() => {
        this.refreshUserList();
      }, (error: HttpErrorResponse) => {});
  }

}
