import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";

import { LoginSignupComponent } from '../components/login-signup/login-signup.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [{ path: "", component: LoginSignupComponent }];

@NgModule({
  declarations: [LoginSignupComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class LoginSignupModule { }
