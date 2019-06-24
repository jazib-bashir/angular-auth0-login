import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from '../services/auth.service';
import { MY_CONFIG_TOKEN, MY_CONFIG } from '../app.constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    { provide: MY_CONFIG_TOKEN, useValue: MY_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

