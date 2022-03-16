import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '@material-workspace/services/board.service';
import { ProductService } from '@material-workspace/services/product.service';
import { SellsService } from '@material-workspace/services/sells.service';
import { firstValueFrom, map, Observable, startWith, tap } from 'rxjs';

@Component({
  selector: 'material-workspace-task-dialog',
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
            {{ option.title }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
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
export class TaskDialogComponent implements OnInit {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  myControl = new FormControl();

  options: any[] = [];

  filteredOptions: Observable<any[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    private sellsService: SellsService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    firstValueFrom(this.productService.getUserProducts())
      .then((products) => {
        this.options = products;
        return this.options;
      })
      .then(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.title)),
          map((title) => (title ? this._filter(title) : this.options.slice()))
        );

        return;
      });
  }

  getPosts(value: any) {
    this.data.task = value;
    console.log('data,', this.data.task);
  }

  displayFn(value: any): string {
    return value && value.title ? value.title : '';
  }

  private _filter(title: string): any[] {
    const filterValue = title.toLowerCase();

    return this.options.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
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
