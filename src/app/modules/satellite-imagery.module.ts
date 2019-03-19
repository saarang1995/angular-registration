import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from "./common-components.module";
import { SatelliteImageryComponent } from '../components/satellite-imagery/satellite-imagery.component';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [{ path: "", component: SatelliteImageryComponent }];

@NgModule({
  declarations: [SatelliteImageryComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class SatelliteImageryModule { }
