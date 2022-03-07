import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000,
    });

    console.log('is null?,', this.snackBar);
    this.router.navigate(['/login']);

    this.snackBar._openedSnackBarRef
      ?.afterOpened()
      .pipe(tap(() => this.router.navigate(['/login'])))
      .subscribe();
  }
}
