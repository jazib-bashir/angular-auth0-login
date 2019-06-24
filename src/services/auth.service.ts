import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, bindNodeCallback } from 'rxjs';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

import { MY_CONFIG_TOKEN, ApplicationConfig } from '../app.constants';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _authFlag = 'isLoggedIn';
  
  auth0 = new auth0.WebAuth({
    clientID: this.config.auth0ClientID,
    domain: this.config.auth0Domain,
    responseType: 'token id_token',
    redirectUri: this.config.auth0CallBack,
    scope: 'openid'
  });

  // Create observable of Auth0 checkSession method to
  // verify authorization server session and renew tokens
  checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));


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

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    localStorage.setItem("_expiresAt", expiresAt.toString());
    localStorage.setItem("_accessToken", authResult.accessToken);
    localStorage.setItem("_idToken", authResult.idToken);
    localStorage.setItem(this._authFlag, JSON.stringify(true));
  }

  public renewTokens(): void {
    this.checkSession$({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    localStorage.removeItem("_accessToken");
    localStorage.removeItem("_idToken");
    localStorage.removeItem("_expiresAt");
    localStorage.setItem(this._authFlag, JSON.stringify(false));
    
    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem(this._authFlag));
  }

}
