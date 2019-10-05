import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {MatCardModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'auth', component: AuthComponent},
      // { path: 'users', component: UsersComponent },
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
      {path: '**', redirectTo: 'auth', pathMatch: 'full'},
    ]),
    MatCardModule,
    MatListModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
