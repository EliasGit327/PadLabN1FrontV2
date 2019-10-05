import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatButtonModule, MatCard, MatIconModule, MatInputModule, MatSnackBarModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
    // MatCard
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
