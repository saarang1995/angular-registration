import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RegionListComponent } from '../components/region-list/region-list.component';
import { ServiceHeroComponent } from '../components/service-hero/service-hero.component';

@NgModule({
  declarations: [NavbarComponent, RegionListComponent, ServiceHeroComponent],
  imports: [CommonModule],
  exports: [
    NavbarComponent,
    RegionListComponent,
    ServiceHeroComponent
  ]
})
export class CommonComponentsModule {}
