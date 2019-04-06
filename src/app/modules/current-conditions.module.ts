import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentConditionsComponent } from 'src/app/components/current-conditions/current-conditions.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponentsModule } from './common-components.module';

const appRoutes: Routes = [{ path: "", component: CurrentConditionsComponent }];
@NgModule({
  declarations: [CurrentConditionsComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class CurrentConditionsModule { }
