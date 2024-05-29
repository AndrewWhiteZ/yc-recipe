import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeIndexPageComponent } from './component/recipe-index-page/recipe-index-page.component';
import { RecipeConstructorPageComponent } from './component/recipe-constructor-page/recipe-constructor-page.component';
import { RecipePageComponent } from './component/recipe-page/recipe-page.component';

const routes: Routes = [
  { path: '', component: RecipeIndexPageComponent },
  { path: 'recipe', component: RecipeIndexPageComponent },
  { path: 'recipe/constructor', component: RecipeConstructorPageComponent },
  { path: 'recipe/:id/edit', component: RecipeConstructorPageComponent },
  { path: 'recipe/:id', component: RecipePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
