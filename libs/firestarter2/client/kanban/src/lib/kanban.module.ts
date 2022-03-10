import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardDialogComponent } from './dialogs/board-dialog/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SharedModule } from '@material-workspace/firestarter2/client/shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BoardsListComponent }]),
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  declarations: [
    BoardComponent,
    BoardsListComponent,
    BoardDialogComponent,
    TaskDialogComponent,
  ],
})
export class KanbanModule {}
