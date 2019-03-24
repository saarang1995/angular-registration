import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../components/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponentsModule } from './common-components.module';

const appRoutes: Routes = [{ path: "", component: SignUpComponent }];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class AuthModule { }
