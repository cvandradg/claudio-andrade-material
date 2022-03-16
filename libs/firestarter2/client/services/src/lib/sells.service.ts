import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Board, Task } from '@material-workspace/client/models/board.model';
import { firstValueFrom, switchMap } from 'rxjs';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root',
})
export class SellsService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private inventoryService: InventoryService
  ) {}

  /**
   * Creates a new board for the current user
   */
  async storeSell(data: any) {
    ``;
    const user = await this.afAuth.currentUser;

    return await this.db.collection('sells').add({
      ...data,
      uid: user?.uid,
    });
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * Get sold task
   */
  async moveTask(boardId: string) {
    const currentBoard = await this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid)
            )
            .doc(boardId)
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );

    await firstValueFrom(currentBoard).then((x) => this.parseIngredients(x));

    return;
  }

  parseIngredients(board: any): any {
    const tasks = board.tasks;
    const ingredients = tasks.map((x: any) => x.ingredients);
    const ingredientsArray = [].concat([], ...ingredients);

    const resultado = ingredientsArray.reduce((array: any, item: any) => {
      const existingItem = array.find(
        (innerItem: any) => innerItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + item.quantity;
      } else {
        array.push(item);
      }
      return array;
    }, []);

    this.updateIngredientsBySell(resultado, board);
  }

  async updateIngredientsBySell(ingredientsCluster: any, board: any) {
    let ingredient;
    await firstValueFrom(this.inventoryService.getIngredient('limon')).then(
      (inventory: any) => {
        ingredient = inventory[0];
        this.inventoryService.updateIngredientAmount(
          ingredient,
          'limon',
          ingredient.quantity - 1
        );
      }
    );
  }
}
