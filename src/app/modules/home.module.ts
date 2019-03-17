import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { CommonComponentsModule } from "./common-components.module";
import { HeroComponent } from '../components/hero/hero.component';
import { HomeBodyComponent } from '../components/home-body/home-body.component';

const appRoutes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, HeroComponent, HomeBodyComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class HomeModule {}
