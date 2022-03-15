export interface Ingredient {
  name: string;
  quantity: number;
  unit: enumUnit;
  uuid?: string;
  label?: string;
}

export enum enumUnit {
  gram = 'g',
  liter = 'l',
  miliLiter = 'ml',
  kiloGram = 'kg',
}
