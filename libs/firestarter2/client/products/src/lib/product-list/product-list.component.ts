import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { BoardService } from '@material-workspace/services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '@material-workspace/services/inventory.service';
import { ShareDataService } from '@material-workspace/services/share-data.service';
import { Board } from '@material-workspace/client/models/board.model';
import { Subscription } from 'rxjs';
import { ProductComponentModule } from '../product/product.component';
import { ProductService } from '@material-workspace/services/product.service';
import { ProductDialogComponent } from '../dialogs/product-dialog/product-dialog.component';

@Component({
  selector: 'material-workspace-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  boards: Board[] = [];
  sub: Subscription | undefined;

  isDialogOpen = false;
  // enumUnit: enumUnit | undefined;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private sharedDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.sub = this.productService
      .getUserProducts()
      .subscribe((boards) => (this.boards = boards));

    // this.inventoryService.createBoard({
    //   name: 'fresa',
    //   quantity: 1000,
    //   unit: enumUnit.kiloGram,
    // });

    this.sharedDataService.productDialogOpenner.subscribe((isOpen) => {
      isOpen && this.openProductDialog();
    });
    //<= Always get current value!
  }

  drop(event: any) {
    // moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.productService.sortBoards(this.boards);
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.createBoard({
          title: result,
          priority: this.boards.length,
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

@NgModule({
  imports: [CommonModule, SharedModule, ProductComponentModule],
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
})
export class ProductListComponentModule {}
