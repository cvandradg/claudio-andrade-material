import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/details-page.component';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ListPageComponent},
      {path: ':id', pathMatch: 'full', component: DetailPageComponent},

    ]),
  ],
  declarations: [
    ListPageComponent,
    DetailPageComponent
  ],
})
export class CustomersModule {}
