import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";
import { ForecastsComponent } from '../components/forecasts/forecasts.component';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [{ path: "", component: ForecastsComponent }];

@NgModule({
  declarations: [ForecastsComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class ForecastsModule { }
