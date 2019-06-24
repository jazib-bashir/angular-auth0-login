import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

import { MY_CONFIG_TOKEN, ApplicationConfig } from '../app.constants';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: this.config.auth0ClientID,
    domain: this.config.auth0Domain,
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(@Inject(MY_CONFIG_TOKEN) private config: ApplicationConfig, public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

}

