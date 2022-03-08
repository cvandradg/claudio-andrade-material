import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { BoardDialogComponent } from '../board-dialog/board-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
  ],
  entryComponents: [BoardDialogComponent, TaskDialogComponent]
})
export class KanbanModule {}
