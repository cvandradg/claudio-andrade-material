import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailLoginComponent } from './email-login/email-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin/google-signin.directive';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    EmailLoginComponent,
    LoginPageComponent,
    GoogleSigninDirective
  ],
})
export class UserModule {}
