import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { LoginInput } from '@graphql';
import { BaseFormComponent } from '@shared/base/base-form-component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseFormComponent<LoginInput> {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
}
