import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  editShoppingForm: FormGroup;
  editMode: { status: boolean; index: number | null };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.editShoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, this.validAmount]),
    });
    this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIndex > -1) {
        this.editMode = { status: true, index: stateData.editedIndex };
        this.editShoppingForm
          .get('name')
          .setValue(stateData.editedIngredient.name);
        this.editShoppingForm
          .get('amount')
          .setValue(stateData.editedIngredient.amount);
      } else {
        this.editMode = { status: false, index: null };
      }
      console.log('stateData', stateData);

      // this.nameInputRef = stateData.editedIngredient.name;
      // this.amountInputRef = stateData.editedIngredient.amount
    });
    // this.slService.singleIngredient.subscribe((value) => {
    //   console.log(value);
    //   this.editShoppingForm.setValue(value);
    // });
    // this.slService.editMode.subscribe(
    //   (value: { status: boolean; index: number | null }) => {
    //     // console.log(value.status);
    //     this.editMode = value;
    //   }
    // );
  }

  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.slService.addIngredient(newIngredient);
  // }
  clearFields() {
    this.editShoppingForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onSubmitForm() {
    const name = this.editShoppingForm.get('name').value;
    const amount = this.editShoppingForm.get('amount').value;

    if (this.editMode.status) {
      // this.slService.editIngredient(this.editMode.index, { name, amount });
      let newIng = new Ingredient(name, amount);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editMode.index,
          ingredient: newIng,
        })
      );
      // this.editMode = { index: this.editMode.index, status: false };
      this.store.dispatch(new ShoppingListActions.StopEdit());
    } else {
      console.log(this.editShoppingForm);
      const newIngredient = new Ingredient(
        this.editShoppingForm.value.name,
        this.editShoppingForm.value.amount
      );
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.clearFields();
  }
  validAmount(control: FormControl): { [s: string]: boolean } | null {
    if (+control.value < 1) {
      return { numberIsWrong: true };
    }
    return null;
  }
  deleteItem() {
    // console.log(this.editMode.index, this.editMode.status);

    if (this.editMode.status) {
      // this.slService.deleteIngredient(this.editMode.index);
      this.store.dispatch(
        new ShoppingListActions.DeleteIngredient(this.editMode.index)
      );
      this.editMode = { index: this.editMode.index, status: false };
    }
    this.clearFields();
  }
  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
