import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs-compat';
import { HttpRequestService } from 'src/app/shared/httpRequest.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  // subscription: Subscription;
  httpSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpRequestService,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipeChange.subscribe((recipes) => {
    //   this.recipes = recipes;
    // });
    this.store.select("recipe").subscribe(data=>{
      console.log(data);
      this.recipes = data.recipes
    })
    // this.httpSubscription = this.httpService.fetchData().subscribe((data) => {
    //   this.recipeService.setRecipe(data);
    //   this.recipeService.recipeChange.next(data);
    // });
    // console.log('List rendered');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.httpSubscription.unsubscribe();
  }
}
