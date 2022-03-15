import {
  Component,
  OnInit,
  NgModule,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { BoardService } from '@material-workspace/services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { SellsService } from '@material-workspace/services/sells.service';
import { Product } from '@material-workspace/client/models/product.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import * as uuid from 'uuid';
import { IngredientDialogComponent } from '../dialogs/ingredient-dialog/ingredient-dialog.component';
import { ProductService } from '@material-workspace/services/product.service';
import { Ingredient } from '@material-workspace/client/models/ingredient.model';

@Component({
  selector: 'material-workspace-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  isDialogOpen = false;

  taskDrop(event: any) {
    moveItemInArray(
      this.product?.ingredients,
      event.previousIndex,
      event.currentIndex
    );
    this.productService.updateProducts(
      this.product.id,
      this.product.ingredients
    );
  }

  openDialog(ingredient?: Ingredient, idx?: number): void {
    const newProduct = {
      name: '',
      label: 'purple',
      price: 0,
      quantity: 0,
      uuid: uuid.v4(),
      ingredients: [],
    };

    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '500px',
      data: ingredient
        ? {
            ingredients: { ...ingredient },
            isNew: false,
            productId: this.product.id,
            idx,
          }
        : { ingredients: newProduct, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      console.log('result,',result)
      console.log('product id,',this.product.id)

      if (result) {
        if (result.isNew) {
          // console.log('board tasks,', result)
          this.productService.updateProducts(this.product.id, [
            ...this.product.ingredients,
            result.ingredients,
          ]);
        } else {
          const update = this.product.ingredients;
          const usplice = update.splice(result.idx, 1, result.task);
          this.productService.updateProducts(
            this.product.id,
            this.product.ingredients
          );
        }
      }
    });
  }

  handleDelete() {
    this.productService.deleteProduct(this.product.id);
  }

  handleTaskSold() {
    console.log('board id,', this.product.id);
    this.sellsService.moveTask(this.product.id);
  }

  // getPriceSum(tasks: Ingredient[]): any {
  //   return tasks.reduce(
  //     (previousValue, currentValue) => currentValue.price + previousValue,
  //     0
  //   );
  // }

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private sellsService: SellsService
  ) {}
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProductComponent],
  exports: [ProductComponent],
})
export class ProductComponentModule {}
