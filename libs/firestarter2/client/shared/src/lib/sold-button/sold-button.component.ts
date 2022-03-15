import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'material-workspace-sold-button',
  templateUrl: './sold-button.component.html',
  styleUrls: ['./sold-button.component.scss'],
})
export class SoldButtonComponent {
  canSell: boolean | undefined;

  @Output() sold = new EventEmitter<boolean>();

  cancel() {
    this.canSell = false;
  }

  prepareForSell() {
    this.canSell = true;
  }

  sellTask() {
    this.sold.emit(true);
    this.canSell = false;
  }
}

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [SoldButtonComponent],
  exports: [SoldButtonComponent],
})
export class SoldButtonComponentModule {}
