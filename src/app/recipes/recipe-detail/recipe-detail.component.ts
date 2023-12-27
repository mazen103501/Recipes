import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpRequestService } from 'src/app/shared/httpRequest.service';
import { AppState } from 'src/app/store/app.reducer';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as RecipeActions from "../store/recipe.actions"

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpRequestService,
    private store:Store<AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.select("recipe").subscribe(data=>{
        // console.log(data.recipes);
        this.recipe = data.recipes[this.id]
      })
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
    // console.log(this.id);

    this.store.dispatch(RecipeActions.deleteRecipe({index: this.id}))
  }
}
