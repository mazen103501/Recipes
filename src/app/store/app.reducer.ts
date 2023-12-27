import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../authentication/store/auth.reducer';
import * as fromRecipe from "../recipes/store/recipe.reducer"
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.State;
  recipe: fromRecipe.recipeStateInterface
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
  recipe: fromRecipe.recipeReducer
};
