import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { DatabaseService } from './services/database.service';
import { ConstantService } from './services/constant.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonComponentsModule } from './modules/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    DatabaseService,
    ConstantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
