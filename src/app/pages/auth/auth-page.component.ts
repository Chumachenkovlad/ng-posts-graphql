import { Component } from '@angular/core';

import { AuthService } from '@shared/services/auth.service';
import { Requester } from '@shared/services/requester.service';

import { LoginInput, RegisterInput } from './../../../generated/graphql';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  providers: [Requester]
})
export class AuthPageComponent {
  loading$ = this.requester.loading$;
  error$ = this.requester.errors$;

  constructor(private authService: AuthService, private requester: Requester) {}

  login(loginInput: LoginInput) {
    console.log(loginInput);
    this.requester
      .decorateRequest(this.authService.login({ loginInput }))
      .subscribe();
  }

  register(registerInput: RegisterInput) {
    this.requester
      .decorateRequest(this.authService.register({ registerInput }))
      .subscribe();
  }
}
