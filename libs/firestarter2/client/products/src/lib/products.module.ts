import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ProductListComponent,
  ProductListComponentModule,
} from './product-list/product-list.component';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { ProductComponentModule } from './product/product.component';
import { IngredientDialogComponentModule } from './dialogs/ingredient-dialog/ingredient-dialog.component';
import { ProductDialogComponentModule } from './dialogs/product-dialog/product-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductComponentModule,
    ProductListComponentModule,
    IngredientDialogComponentModule,
    ProductDialogComponentModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductListComponent },
    ]),
  ],
})
export class ProductsModule {}
