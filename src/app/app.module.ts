import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppConfig as appConfig } from './config/app.config';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(appConfig(environment.apiKey)),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
