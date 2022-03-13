export interface Ingredient {
  name: string;
  quantity: number;
  unit: enumUnit;
  id?: string;
}

export enum enumUnit {
  gram = 'g',
  liter = 'l',
  miliLiter = 'ml',
  kiloGram = 'kg',
}
