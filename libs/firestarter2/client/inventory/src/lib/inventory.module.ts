import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryService } from '@material-workspace/services/inventory.service';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: InventoryListComponent },
    ]),
  ],
  providers: [InventoryService],
})
export class InventoryModule {}
