import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

const decCompnents = [
  RecipesComponent,
  RecipeListComponent,
  RecipeDetailComponent,
  RecipeItemComponent,
  RecipeStartComponent,
  RecipeEditComponent,
];

@NgModule({
  declarations: decCompnents,
  imports: [RecipeRoutingModule, CommonModule, ReactiveFormsModule],
})
export class RecipeModule {}
