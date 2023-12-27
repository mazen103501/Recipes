import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

const decComponent = [ShoppingListComponent, ShoppingEditComponent];

@NgModule({
  declarations: decComponent,
  imports: [
    ShoppingListRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingListModule {}
