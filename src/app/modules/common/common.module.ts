import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonRoutingModule } from './common-routing.module';
import { HomeComponent } from './page/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    HomeComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommonPageModule { }
