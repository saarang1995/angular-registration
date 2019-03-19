import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: "./modules/home.module#HomeModule",
    data: {
      preload: true
    }
  },
  {
    path: "weather-forecasts",
    loadChildren: "./modules/forecasts.module#ForecastsModule",
    data: {
      preload: true
    }
  },
  {
    path: "weather-alarms",
    loadChildren: "./modules/weather-alarms.module#WeatherAlarmsModule",
    data: {
      preload: true
    }
  },
  {
    path: "govt-alerts",
    loadChildren: "./modules/govt-alarms.module#GovtAlarmsModule",
    data: {
      preload: true
    }
  },
  {
    path: "satellite-imagery",
    loadChildren: "./modules/satellite-imagery.module#SatelliteImageryModule",
    data: {
      preload: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
