import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
  auth0ClientID: string;
  auth0Domain: string;
  auth0CallBack: string;
}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  auth0ClientID: 'f1d7GIUsCxCltnfKVzH8yLkK3tk5EvIH',
  auth0Domain: 'hotel-booking-test.auth0.com',
  auth0CallBack: 'http://localhost:4200/callback'
};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
