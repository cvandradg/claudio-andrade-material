import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';

@Component({
  selector: 'material-workspace-product-dialog',
  styleUrls: ['../dialog.scss'],
  template: `
    <h1 mat-dialog-title>Product</h1>
    <div mat-dialog-content>
      <p>Como deberia de llamarse el producto?</p>
      <mat-form-field>
        <input placeholder="title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
})
export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProductDialogComponent],
  exports: [ProductDialogComponent],
})
export class ProductDialogComponentModule {}
