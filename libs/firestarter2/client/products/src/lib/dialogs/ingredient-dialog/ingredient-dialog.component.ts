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

  options: any[] = [];

  filteredOptions: Observable<any[]> | undefined;
  ingredients: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    private boardService: BoardService,
    private sellsService: SellsService,
    private inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {

    console.log('data,',this.data)
    
    await firstValueFrom(this.inventoryService.getUserBoards())
      .then((x) => (this.options = x))
      .then((x) => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.options.slice())),
          tap((x) => console.log('tiene algo?,', this.options))
        );

        return;
      });
  }

  getPosts(value: any) {
    this.data.ingredients = value;
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
