import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TuiFileLike } from '@taiga-ui/kit';
import { defaultEditorTools, TuiEditorTool } from '@tinkoff/tui-editor';
import { Subject } from 'rxjs';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-recipe-constructor-page',
  templateUrl: './recipe-constructor-page.component.html',
  styleUrl: './recipe-constructor-page.component.less',
})
export class RecipeConstructorPageComponent {
  
  imagePath: string = '';

  readonly recipeForm = new FormGroup({
    name: new FormControl(),
    picture: new FormControl(),
    text: new FormControl(),
  });
  
  readonly tools: TuiEditorTool[] = defaultEditorTools;

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.recipeForm.controls.picture.valueChanges.subscribe({
    next: () => { this.imagePath = (window.URL || window.webkitURL).createObjectURL(this.recipeForm.controls.picture.value) }
  });

  constructor(
    private readonly recipeService: RecipeService,
  ) {}

  createRecipe() {
    this.imagePath = (window.URL || window.webkitURL).createObjectURL(this.recipeForm.controls.picture.value);

    const controls = this.recipeForm.controls;
    const createRecipeRequest = {
      name: controls.name.value,
      picture: controls.picture.value,
      text: controls.text.value
    }

    this.recipeService.createRecipe(createRecipeRequest);
  }
}
