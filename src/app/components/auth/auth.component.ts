import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserForCreation } from '../../models/UserForCreation';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    private http: HttpClient,
    private router: Router
  ) {
    this.isRequesting = false;
  }

  isRequesting: boolean;
  userName: string;

  regFormUserDescr: string;
  regFormUserName: string;

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

  createUser(nameIn: string, descriptionIn: string) {
    const newUser: UserForCreation = {
      name: nameIn,
      description: descriptionIn
    };

    if (nameIn.length > 0 || descriptionIn.length > 0) {
      this.http.post(`api/users`, newUser)
        .subscribe(() => {
            this.showSnackbar('User has been created!');
            this.regFormUserDescr = '';
            this.regFormUserName = '';
          },
          (error: HttpErrorResponse) => {

          });
    } else {
      this.showSnackbar('Both inputs should have value');
    }
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
}
