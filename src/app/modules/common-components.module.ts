import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RegionListComponent } from '../components/region-list/region-list.component';
import { ServiceHeroComponent } from '../components/service-hero/service-hero.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';

@NgModule({
  declarations: [NavbarComponent, RegionListComponent, ServiceHeroComponent, GoogleMapsComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    RegionListComponent,
    ServiceHeroComponent,
    GoogleMapsComponent
  ]
})
export class CommonComponentsModule {}
