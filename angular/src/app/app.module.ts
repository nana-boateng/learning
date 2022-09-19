import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DetailComponent } from './recipe/detail/detail.component';
import { RecipeListItem } from './recipe/list/item/item.component';
import { Recipe } from './recipe/recipe.component';
import { ShoppingIngredient } from './shopping/ingredient/ingredient.component';
import { ShoppingListEdit } from './shopping/list/edit/edit.component';
import { Shopping } from './shopping/shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailComponent,
    RecipeListItem,
    ShoppingListEdit,
    ShoppingIngredient,
    Shopping,
    Recipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
