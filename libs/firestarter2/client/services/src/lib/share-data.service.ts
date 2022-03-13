import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  //Using any
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  openDialog(isOpen: boolean) {
    this.messageSource.next(isOpen);
  }
}
