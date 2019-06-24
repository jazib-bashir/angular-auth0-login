import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from '../services/auth.service';
import { MY_CONFIG_TOKEN, MY_CONFIG } from '../app.constants';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    NavbarComponent
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

