import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as RecipeActions from "../store/recipe.actions"
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store:Store
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredientsArr = new FormArray([]);
    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients.length > 0) {
        for (const ingre of recipe.ingredients) {
          ingredientsArr.push(
            new FormGroup({
              name: new FormControl(ingre.name, Validators.required),
              amount: new FormControl(ingre.amount, [
                Validators.required,
                this.validAmount,
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredientsArr,
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    let name = this.recipeForm.get('name').value;
    let imagePath = this.recipeForm.get('imagePath').value;
    let description = this.recipeForm.get('description').value;
    let ingredients = this.recipeForm.get('ingredients').value;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, recipe);
      this.store.dispatch(RecipeActions.updateRecipe({newRecipe: recipe,index:this.id}))
    } else {
      // this.recipeService.addRecipe(recipe);
      this.store.dispatch(RecipeActions.addRecipe({newRecipe:recipe}))
    }
    this.editMode = false;
    this.recipeForm.reset();
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [Validators.required, this.validAmount]),
      })
    );
  }

  validAmount(control: FormControl): { [s: string]: boolean } | null {
    if (+control.value < 1) {
      return { numberIsWrong: true };
    }
    return null;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  removeIngInput(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
