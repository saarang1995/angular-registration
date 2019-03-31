import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { ServiceHeroComponent } from '../components/service-hero/service-hero.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, ServiceHeroComponent, GoogleMapsComponent],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    ServiceHeroComponent,
    GoogleMapsComponent,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CommonComponentsModule { }
