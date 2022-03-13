import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: InventoryListComponent },
    ]),
  ],
})
export class InventoryModule {}
