import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth-service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService ) {
    this.userName = '';
  }

  userName: string;

  ngOnInit() {
  }

  printUserName(name: string) {
    // console.log(name);
    console.log(this.authService.user);
  }

  getUserRequest(name: string) {
    console.log(`requestSent for ${name}`);
  }

}
