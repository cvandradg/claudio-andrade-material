import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';

import { BoardService } from '@material-workspace/services/board.service';
import { Board } from '@material-workspace/client/models/board.model';
import { ShareDataService } from '@material-workspace/services/share-data.service';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'material-workspace-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  boards: Board[] = [];
  sub: Subscription | undefined;
  @Output() notifyBoardDialog: EventEmitter<any> = new EventEmitter();
  event$: any;
  currentUrl = '';

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
    private sharedDataService: ShareDataService,
    private router: Router
  ) {
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
      }
    });
  }

  openBoardDialog(): void {
    this.sharedDataService.openDialog(true);
  }

  openProductListDialog(): void {
    this.sharedDataService.openProductDialog(true);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.event$.unsubscribe();
  }
}
