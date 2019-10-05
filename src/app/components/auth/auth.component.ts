import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isRequesting = false;
  }

  isRequesting: boolean;
  userName: string;

  ngOnInit() {}

  getUserRequest(name: string) {
    this.isRequesting = true;

    this.authService.getUserName(name).subscribe(
      data => {
        this.isRequesting = false;
        this.authService.authorize(data);
        this.router.navigate(['home']);
      },
      (error: HttpErrorResponse) => {
        this.isRequesting = false;
        this.showSnackbar('No user found');
      }
    );
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
}
