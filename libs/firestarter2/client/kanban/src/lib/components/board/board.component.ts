import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '@material-workspace/client/models/board.model';
import { BoardService } from '@material-workspace/services/board.service';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import * as uuid from 'uuid';
import { SellsService } from '@material-workspace/services/sells.service';

@Component({
  selector: 'material-workspace-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  isDialogOpen = false;

  taskDrop(event: any) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = {
      name: '',
      label: 'purple',
      price: 0,
      uuid: uuid.v4(),
      ingredients: [],
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('result,', result);

      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            result.task,
          ]);
        } else {
          const update = this.board.tasks;
          const usplice = update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteBoard(this.board.id);
  }

  handleTaskSold() {
    this.sellsService.moveTask(this.board.id);
  }

  getPriceSum(tasks: Task[]): any {
    return tasks.reduce(
      (previousValue, currentValue) => currentValue.price + previousValue,
      0
    );
  }

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    private sellsService: SellsService
  ) {}
}
