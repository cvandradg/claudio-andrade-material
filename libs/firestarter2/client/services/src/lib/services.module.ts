import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from './inventory.service';
import { BoardService } from './board.service';
import { ShareDataService } from './share-data.service';

@NgModule({
  imports: [CommonModule],
  providers: [InventoryService, BoardService, ShareDataService],
})
export class ServicesModule {}
