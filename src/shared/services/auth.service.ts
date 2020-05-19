import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, NEVER } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import Maybe from 'graphql/tsutils/Maybe';

import {
  AuthPayload,
  GetUserSelfQueryService,
  LoginMutationService,
  LoginMutationVariables,
  RegisterMutationService,
  RegisterMutationVariables,
  User
} from './../../generated/graphql';
import { AuthTokenService } from './auth-token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<Maybe<User>>(null);

  get currentUser$() {
    return this.userSubject.asObservable();
  }

  get isLoggedIn() {
    return this.userSubject.pipe(map(Boolean));
  }

  getUser() {
    return this.userSubject.getValue();
  }

  constructor(
    private registerMutation: RegisterMutationService,
    private loginMutation: LoginMutationService,
    private getUserSelfQuery: GetUserSelfQueryService,
    private authTokenService: AuthTokenService,
    private router: Router
  ) {}

  public get hasToken() {
    return this.authTokenService.check();
  }

  public loadUser() {
    return this.hasToken
      ? this.getUserSelfQuery.fetch().pipe(
          tap(res => {
            const user = res.data.getUserSelf;
            this.userSubject.next(user);
          })
        )
      : NEVER;
  }

  public logout() {
    this.authTokenService.remove();
    this.userSubject.next(null);
    this.router.navigateByUrl('/');
  }

  public login(input: LoginMutationVariables) {
    console.log(input);
    return this.loginMutation
      .mutate(input)
      .pipe(tap(res => this.handleAuthPayload(res.data.login)));
  }

  public register(input: RegisterMutationVariables) {
    return this.registerMutation
      .mutate(input)
      .pipe(tap(res => this.handleAuthPayload(res.data.register)));
  }

  public handleAuthPayload({ user, token, expires }: AuthPayload) {
    this.userSubject.next(user);
    this.authTokenService.set(token, expires);
  }
}
