import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom, map, Observable, startWith, tap } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SellsService } from '@material-workspace/services/sells.service';
import { BoardService } from '@material-workspace/services/board.service';
import { TaskDialogComponent } from '@material-workspace/board/dialogs/task-dialog/task-dialog.component';
import { FormControl } from '@angular/forms';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';
import { InventoryService } from '@material-workspace/services/inventory.service';
import {
  enumUnit,
  Ingredient,
  IngredientLabelMapping,
} from '@material-workspace/client/models/ingredient.model';

@Component({
  selector: 'material-workspace-ingredient-dialog',
  styleUrls: ['../dialog.scss'],
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <mat-label>Pick one</mat-label>
        <input
          type="text"
          placeholder="Pick one"
          aria-label="pick one"
          matInput
          [formControl]="myControl"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete
          #auto="matAutocomplete"
          [displayWith]="displayFn"
          (optionSelected)="getPosts($event.option.value)"
        >
          <mat-option
            *ngFor="let option of filteredOptions | async"
            [value]="option"
          >
            {{ option.name }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <br />
      <mat-form-field>
        <input placeholder="Cantidad" matInput [formControl]="myControl2" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Unidad</mat-label>
        <mat-select (selectionChange)="onToggleChange($event.value)">
          <mat-option *ngFor="let unit of unitTypes" [value]="unit">
            {{ unit }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.ingredients.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon cdkFocusInitial [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        [mat-dialog-close]="data"
        [disabled]="!myControl.value"
      >
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>

      <material-workspace-delete-button
        (delete)="handleTaskDelete()"
      ></material-workspace-delete-button>
    </div>
  `,
})
export class IngredientDialogComponent implements OnInit {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();

  selected: any;

  public IngredientLabelMapping = IngredientLabelMapping;
  public unitTypes = Object.values(enumUnit);

  options: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  ingredients: Ingredient[] = [];

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    private boardService: BoardService,
    private sellsService: SellsService,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await firstValueFrom(this.inventoryService.getUserBoards())
      .then((ingredients) => (this.options = ingredients))
      .then(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.options.slice()))
        );

        return;
      });

    this.myControl2.valueChanges.subscribe(
      (quantity) => (this.data.ingredients.quantity = quantity)
    );
  }

  getPosts({ name, id, uid, uuid }: any) {
    this.data.ingredients.name = name;
    this.data.ingredients.id = id;
    this.data.ingredients.uid = uid;
    this.data.ingredients.uuid = uuid;

    console.log('data selected2,', this.data.ingredients);
  }

  onToggleChange($event: any) {
    this.data.ingredients.unit = $event;
  }

  displayFn(value: any): string {
    return value && value.name ? value.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [IngredientDialogComponent],
  exports: [IngredientDialogComponent],
})
export class IngredientDialogComponentModule {}
