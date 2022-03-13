import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';

import { BoardService } from '@material-workspace/services/board.service';
import { Board } from '@material-workspace/client/models/board.model';
import { ShareDataService } from '@material-workspace/services/share-data.service';

@Component({
  selector: 'material-workspace-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  boards: Board[] = [];
  sub: Subscription | undefined;
  @Output() notifyBoardDialog: EventEmitter<any> = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    public boardService: BoardService,
    private sharedDataService: ShareDataService
  ) {}

  openBoardDialog(): void {
    this.sharedDataService.openDialog(true);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
