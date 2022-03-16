import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Ingredient } from '../../../models/ingredient.model';
import * as uuid from 'uuid';
import { Task } from '@material-workspace/client/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  ////////////////////////////////////////////////////////////////

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Ingredient) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('inventory').add({
      ...data,
      uid: user?.uid,
      uuid: uuid.v4(),
    });
  }

  /**
   * Get all boards owned by current user
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Ingredient>('inventory', (ref) =>
              ref.where('uid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Get ingredient by name.
   */
  getIngredient(name: string) {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Ingredient>('inventory', (ref) =>
              ref.where('name', '==', name)
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
  // sortBoards(boards: Board[]) {
  //   const db = firebase.firestore();
  //   const batch = db.batch();
  //   const refs = boards.map(b => db.collection('boards').doc(b.id));
  //   refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
  //   batch.commit();
  // }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * updateIngredientAmount
   */
  updateIngredientAmount(ingredient: any, name: string, quantity: number) {
    return this.db
      .collection('inventory')
      .doc(ingredient.id)
      .update({ quantity });
  }

  /**
   * Remove a specifc task from the board
   */
  // removeTask(boardId: string, task: Task) {
  //   return this.db
  //     .collection('boards')
  //     .doc(boardId)
  //     .update({
  //       tasks: firebase.firestore.FieldValue.arrayRemove(task)
  //     });
  // }
}
