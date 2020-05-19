import { Component } from '@angular/core';

import { RegisterInput } from './../../../../../generated/graphql';
import { BaseFormComponent } from './../../../../../shared/base/base-form-component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends BaseFormComponent<RegisterInput> {
  form = this.fb.group({
    username: [''],
    email: [''],
    password: ['']
  });
}
