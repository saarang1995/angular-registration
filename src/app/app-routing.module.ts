import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

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
    canActivate: [AuthenticationGuard],
    loadChildren: "./modules/forecasts.module#ForecastsModule",
    data: {
      preload: true
    }
  },
  {
    path: "weather-alarms",
    canActivate: [AuthenticationGuard],
    loadChildren: "./modules/weather-alarms.module#WeatherAlarmsModule",
    data: {
      preload: true
    }
  },
  {
    path: "govt-alerts",
    canActivate: [AuthenticationGuard],
    loadChildren: "./modules/govt-alarms.module#GovtAlarmsModule",
    data: {
      preload: true
    }
  },
  {
    path: "satellite-imagery",
    canActivate: [AuthenticationGuard],
    loadChildren: "./modules/satellite-imagery.module#SatelliteImageryModule",
    data: {
      preload: true
    }
  },
  {
    path: "login",
    loadChildren: "./modules/login.module#LoginModule",
    data: {
      preload: true
    }
  },
  {
    path: "signup",
    loadChildren: "./modules/auth.module#AuthModule",
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
