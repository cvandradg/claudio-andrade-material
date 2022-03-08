import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailLoginComponent } from './email-login/email-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin/google-signin.directive';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: '', component: LoginPageComponent }
    ]),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmailLoginComponent,
    LoginPageComponent,
    GoogleSigninDirective
  ],
  exports: [GoogleSigninDirective]
})
export class UserModule {}
