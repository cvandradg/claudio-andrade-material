import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '@material-workspace/services/board.service';
import { SellsService } from '@material-workspace/services/sells.service';
import { map, Observable, startWith, tap } from 'rxjs';

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
            {{ option.name }}
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
  options: any[] = [
    {
      ingredients: [
        {
          name: 'limon',
          quantity: 1,
          unit: 'kg',
        },
        {
          name: 'sandia',
          quantity: 2,
          unit: 'kg',
        },
        {
          name: 'mora',
          quantity: 3,
          unit: 'kg',
        },
        {
          name: 'avena',
          quantity: 4,
          unit: 'kg',
        },
      ],
      label: 'green',
      price: 5000,
      name: 'Batido de limon',
    },
    {
      ingredients: [],
      label: 'red',
      price: 3000,
      name: 'Batido de fresa',
    },
    {
      ingredients: [],
      label: 'purple',
      price: 1000,
      name: 'Batido de mora',
    },
  ];

  filteredOptions: Observable<any[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    private sellsService: SellsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  getPosts(value: any) {
    this.data.task = value;
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
