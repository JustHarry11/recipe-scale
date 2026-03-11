export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export type Recipe = {
  id: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
};