import { createReducer, on } from "@ngrx/store"
import { LOGIN_START } from "src/app/authentication/store/auth.actions"
import { Ingredient } from "src/app/shared/ingredient.model"
import { Recipe } from "../recipe.model"
import * as RecipeActions from "./recipe.actions"



export interface recipeStateInterface{
  recipes:any,
  editedRecipe: Recipe,
  editedIndex: number
}

const initialState: recipeStateInterface= {
  recipes: [
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
  ],
  editedRecipe:null,
  editedIndex: -1,
}

export const recipeReducer = createReducer(
  initialState,
  on(RecipeActions.addRecipe,(state,{newRecipe})=>{
    const updatedRecipe = state.recipes.slice();
    updatedRecipe.push(newRecipe);
    return {
      ...state,
      recipes:updatedRecipe
    }
  }),
  on(RecipeActions.deleteRecipe,(state,{index})=>{
    const filtedRecipe = state.recipes.slice();
    filtedRecipe.splice(index,1)
    // console.log(newRecipes);
    return {
      ...state,
      recipes : filtedRecipe
    }
  }),
  on(RecipeActions.updateRecipe,(state,{newRecipe,index})=>{
    const newRecipeArray = [...state.recipes];
    newRecipeArray[index] = newRecipe;
    console.log(newRecipeArray , newRecipe);

    return {
      ...state,
      recipes: newRecipeArray
    }
  }),
  on(RecipeActions.setRecipes,(state,{newRecipes})=>{
    console.log(newRecipes);

    return {
      ...state,
      recipes: newRecipes
    }
  })
);
