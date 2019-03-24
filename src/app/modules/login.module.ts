import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";

import { LoginComponent } from '../components/login/login.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class LoginModule {

}
