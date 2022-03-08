import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', component: HomePageComponent },
      {
        path: 'login',
        loadChildren: () => import('@material-workspace/firestarter2/client/user').then(m => m.UserModule)
      },
      {
        path: 'kanban',
        loadChildren: () =>
          import('@material-workspace/firestarter2/client/kanban').then(m => m.KanbanModule),
        // canActivate: [AuthGuard]
      },
    ]),
  ],
  declarations: [
    HomePageComponent
  ],
})
export class AppUIModule {}