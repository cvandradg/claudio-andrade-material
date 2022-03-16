import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from './inventory.service';
import { BoardService } from './board.service';
import { ShareDataService } from './share-data.service';
import { SellsService } from './sells.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    InventoryService,
    BoardService,
    ShareDataService,
    SellsService,
    ProductService,
  ],
})
export class ServicesModule {}
