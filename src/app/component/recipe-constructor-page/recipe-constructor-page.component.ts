import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { TUI_EDITOR_DEFAULT_EDITOR_TOOLS, TuiEditorTool } from '@tinkoff/tui-editor';
import { Subject } from 'rxjs';
import { RecipeService } from '../../../service/recipe.service';
import { TuiAlertService } from '@taiga-ui/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeInfo } from '../../../domain/recipe.info';
import { CreateRecipeRequest } from '../../../domain/create-recipe.request';

@Component({
  selector: 'app-recipe-constructor-page',
  templateUrl: './recipe-constructor-page.component.html',
  styleUrl: './recipe-constructor-page.component.less',
})
export class RecipeConstructorPageComponent implements OnInit {
  
  imagePath: string = '';
  currentRecipe: RecipeInfo | null = null;

  readonly recipeForm = new FormGroup({
    name: new FormControl(),
    picture: new FormControl(),
    text: new FormControl(),
  });
  
  readonly tools: TuiEditorTool[] = TUI_EDITOR_DEFAULT_EDITOR_TOOLS;

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.recipeForm.controls.picture.valueChanges.subscribe({
    next: () => { this.imagePath = (window.URL || window.webkitURL).createObjectURL(this.recipeForm.controls.picture.value) }
  });

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => { params['id'] ? this.getRecipeInfo(params['id']) : null }
    })
  }

  getRecipeInfo(recipeId: string): void {
    this.recipeService.getRecipeInfo(recipeId).subscribe({
      next: (res) => {
        this.currentRecipe = res.data;
        const controls = this.recipeForm.controls;
        controls.name.setValue(this.currentRecipe.name);
        controls.text.setValue(this.currentRecipe.text);
      },
      error: (err) => { this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe() }
    });
  }

  createRecipe() {
    this.imagePath = (window.URL || window.webkitURL).createObjectURL(this.recipeForm.controls.picture.value);

    const controls = this.recipeForm.controls;
    const createRecipeRequest: CreateRecipeRequest = {
      name: controls.name.value,
      picture: controls.picture.value,
      text: controls.text.value
    }

    this.recipeService.createRecipe(createRecipeRequest).subscribe({
      next: (res) => {
        this.router.navigateByUrl(`/recipe/${res.data.id}`);
        this.alerts.open(
          'Рецепт успешно создан',
          { label: 'Успешно', status: 'success', autoClose: true }
        ).subscribe();
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }

  editRecipe() {
    this.imagePath = (window.URL || window.webkitURL).createObjectURL(this.recipeForm.controls.picture.value);

    const controls = this.recipeForm.controls;
    const editRecipeRequest: CreateRecipeRequest = {
      name: controls.name.value,
      picture: controls.picture.value,
      text: controls.text.value
    }

    this.recipeService.editRecipe(this.currentRecipe?.id!, editRecipeRequest).subscribe({
      next: (res) => {
        this.router.navigateByUrl(`/recipe/${res.data.id}`);
        this.alerts.open('Рецепт успешно изменен', { label: 'Успешно', status: 'success' }).subscribe();
      },
      error: (err) => this.alerts.open(err.message, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
}
