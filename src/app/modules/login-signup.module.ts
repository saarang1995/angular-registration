import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";

import { LoginSignupComponent } from '../components/login-signup/login-signup.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [{ path: "", component: LoginSignupComponent }];

@NgModule({
  declarations: [LoginSignupComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginSignupModule {

}
