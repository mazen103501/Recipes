import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
@Injectable()
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  // recipes: Recipe[] = [];
  constructor(private store: Store<fromShoppingList.GlobalState>) {}

  getRecipes() {
    // this.recipeChange.next();
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  updateRecipe(index: number, newValue: Recipe) {
    this.recipes[index] = newValue;
    this.recipeChange.next(this.recipes.slice());
  }
  addRecipe(newValue: Recipe) {
    this.recipes.push(newValue);
    this.recipeChange.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next([...this.recipes]);
  }
  setRecipe(data: Recipe[]) {
    this.recipes = data;
    this.recipeChange.next(this.recipes.slice());
  }
}
