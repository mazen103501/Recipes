import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as RecipeAction from "../recipes/store/recipe.actions"
@Injectable({ providedIn: 'root' })
export class HttpRequestService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService,
    private store:Store<AppState>,
  ) {}

  postData() {
    let recipes: Recipe[];
    this.store.select("recipe").subscribe((data)=>{
      recipes = data.recipes;
      console.log(recipes);

    })


    return this.http
      .put(
        'https://angular-test-2a7eb-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();

    // .subscribe((res) => {
    //   console.log(res);
    //   // this.recipeService.recipeChange.next(this.recipeService.getRecipes());
    // });
    // this.recipeService.recipeChange.next(data);
  }
  fetchData() {
    return this.http
      .get(
        'https://angular-test-2a7eb-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((data:any) => {
          // this.recipeService.setRecipe(data);
          console.log(data);

          this.store.dispatch(RecipeAction.setRecipes({newRecipes:data}))
        })
      );
  }
}
