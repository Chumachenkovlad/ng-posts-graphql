import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

const AUTH_TOKEN_COOKIE_NAME = 'app-auth-token';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  constructor(private cookieService: CookieService) {}

  set(token: string, expires: unknown) {
    this.cookieService.set(AUTH_TOKEN_COOKIE_NAME, token, Number(expires));
  }
  get() {
    return this.cookieService.get(AUTH_TOKEN_COOKIE_NAME);
  }
  remove() {
    this.cookieService.delete(AUTH_TOKEN_COOKIE_NAME);
  }
  check() {
    return this.cookieService.check(AUTH_TOKEN_COOKIE_NAME);
  }
}
