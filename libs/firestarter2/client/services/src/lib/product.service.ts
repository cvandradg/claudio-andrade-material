import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '@material-workspace/client/models/board.model';
import { Ingredient } from '@material-workspace/client/models/ingredient.model';
import { switchMap } from 'rxjs';
import { InventoryService } from './inventory.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private inventoryService: InventoryService
  ) {}

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: any) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('products').add({
      ...data,
      uid: user?.uid,
      ingredients: [] as Ingredient[],
    });
  }

  /**
   * Get all boards owned by current user
   */
  getUserProducts() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Task>('products', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: any[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('products').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete board
   */
  deleteProduct(productId: string) {
    return this.db.collection('products').doc(productId).delete();
  }

  /**
   * Updates the tasks on board
   */
  updateProducts(productId: string, ingredients: Task[]) {
    return this.db
      .collection('products')
      .doc(productId)
      .update({ ingredients });
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(productId: string, task: Task) {
    return this.db
      .collection('products')
      .doc(productId)
      .update({
        ingredients: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }
}
