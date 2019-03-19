import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";
import { GovtAlarmsComponent } from '../components/govt-alarms/govt-alarms.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [{ path: "", component: GovtAlarmsComponent }];

@NgModule({
  declarations: [GovtAlarmsComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class GovtAlarmsModule { }
