import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {User} from '../models/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient, private snackBar: MatSnackBar ) {
    this.isRequesting = false;
  }

  isRequesting: boolean;
  userName: string;

  ngOnInit() {
    if (this.authService.user !== undefined && this.authService.user !== null) {
      console.log('Hello');
    }
  }

  printUserName(name: string) {
    // console.log(name);
    console.log(this.authService.user);
  }

  getUserRequest(name: string) {
    this.isRequesting = true;
    this.selectUser(name);
  }

  selectUser(userName: string) {
    this.http.get<User>(`https://localhost:5001/api/userswithsubs/${userName}`).subscribe(data => {
      console.log(userName);
      this.authService.user = data;
      if (data !== null && data !== undefined) {
        // this.getPosts(userName);
        this.isRequesting = false;
        this.showSnackbar(data.name);
      }
    }, (error: HttpErrorResponse) => {
      setTimeout(null, 5000);
      this.isRequesting = false;
      this.showSnackbar('No user found');
    });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }


}
