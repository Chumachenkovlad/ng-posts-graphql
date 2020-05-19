import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { AuthPageComponent } from './auth-page.component';
import { COMPONENTS } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent
      }
    ]),
    SharedModule
  ],
  declarations: [...COMPONENTS, AuthPageComponent]
})
export class AuthModule {}
