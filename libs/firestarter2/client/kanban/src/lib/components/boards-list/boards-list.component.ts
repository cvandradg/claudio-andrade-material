import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '@material-workspace/services/inventory.service';
import { enumUnit } from '@material-workspace/client/models/ingredient.model';
import { Subscription } from 'rxjs';
import { BoardDialogComponent } from '../../dialogs/board-dialog/board-dialog.component';

import { Board } from '@material-workspace/client/models/board.model';
import { BoardService } from '@material-workspace/services/board.service';
import { ShareDataService } from '@material-workspace/services/share-data.service';

@Component({
  selector: 'material-workspace-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub: Subscription | undefined;

  isDialogOpen = false;
  // enumUnit: enumUnit | undefined;

  constructor(
    public boardService: BoardService,
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private sharedDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe((boards) => (this.boards = boards));

    this.inventoryService.createBoard({
      name: 'prueba 1',
      quantity: 1,
      unit: enumUnit.gram,
    });

    this.sharedDataService.currentMessage.subscribe(
      (isOpen) => isOpen && this.openBoardDialog()
    ); //<= Always get current value!
  }

  drop(event: any) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length,
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
