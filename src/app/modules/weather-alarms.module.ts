import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";
import { WeatherAlarmsComponent } from '../components/weather-alarms/weather-alarms.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [{ path: "", component: WeatherAlarmsComponent }];

@NgModule({
  declarations: [WeatherAlarmsComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class WeatherAlarmsModule { }
