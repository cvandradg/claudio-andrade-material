import * as uuid from 'uuid';
import { Ingredient } from '@material-workspace/client/models/ingredient.model';

export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  uuid: any;
  name?: string;
  price: 0;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  ingredients: Ingredient[];
}
