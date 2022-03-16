import { Ingredient } from './ingredient.model';

export interface Product {
  id?: string;
  name: string;
  qunaity: number;
  uid?: string;
  uuid?: string;
  priority?: number;
  ingredients?: Ingredient[];
}
