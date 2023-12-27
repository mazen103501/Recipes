import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredinet';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export const START_EDIT = '[Shopping List] Start Edit';
export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}
export const STOP_EDIT = '[Shopping List] Stop Edit';
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type MultipleActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
