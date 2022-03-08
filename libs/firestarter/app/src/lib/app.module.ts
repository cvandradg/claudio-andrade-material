import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin/google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './board-dialog/board-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./user/user.module').then((module) => module.UserModule),
      },
      {
        path: 'kanban',
        loadChildren: () =>
          import('./kanban/kanban.module').then(
            (module) => module.KanbanModule
          ),
        // canActivate: [AuthGuard],
      },
    ]),
  ],
  declarations: [
    HomePageComponent,
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
    BoardListComponent,
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
  ],
})
export class AppModule {}
