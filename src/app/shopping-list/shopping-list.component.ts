import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }
  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }
  getIndex(index: number) {
    // console.log(index);
    this.store.dispatch(new fromShoppingListActions.StartEdit(index));
    // this.store.dispatch(new fromShoppingListActions.);
    // this.slService.getSingleIngredient(index);
    // this.slService.editMode.next({
    //   status: true,
    //   index,
    // });
  }
}
