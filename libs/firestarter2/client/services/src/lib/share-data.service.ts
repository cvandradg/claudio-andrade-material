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
  private isProductDialogOpen = new BehaviorSubject(false);

  currentMessage = this.messageSource.asObservable();
  productDialogOpenner = this.isProductDialogOpen.asObservable();

  openDialog(isOpen: boolean) {
    this.messageSource.next(isOpen);
  }

  openProductDialog(isOpen: boolean) {
    this.isProductDialogOpen.next(isOpen);
  }
}
