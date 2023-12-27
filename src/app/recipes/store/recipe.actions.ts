import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";


export const addRecipe = createAction('[Recipe] Add Recipe',props<{newRecipe:Recipe}>());
export const deleteRecipe = createAction('[Recipe] Delete Recipe',props<{index:number}>());
export const updateRecipe = createAction('[Recipe] Update Recipe',props<{newRecipe:Recipe,index:number}>());
export const setRecipes = createAction('[Recipe] Set Recipe',props<{newRecipes : any }>());
