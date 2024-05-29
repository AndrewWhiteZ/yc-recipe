import { Component, Inject, OnInit } from '@angular/core';
import { Recipe } from '../../../domain/recipe.entity';
import { RecipeInfo } from '../../../domain/recipe.info';
import { RecipeService } from '../../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { TUI_EDITOR_DEFAULT_EDITOR_TOOLS, TuiEditorTool, defaultEditorTools } from '@tinkoff/tui-editor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.less'
})
export class RecipePageComponent implements OnInit {

  readonly tools: TuiEditorTool[] = [];

  recipeId: string = '';
  currentRecipe: RecipeInfo | null = null;

  formControl: FormControl = new FormControl();

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private alerts: TuiAlertService,
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
    });

    this.recipeService.getRecipeInfo(this.recipeId).subscribe({
      next: (res) => {
        this.currentRecipe = res.data;
        this.formControl.setValue(this.currentRecipe.text);
      },
      error: (err) => { this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe() }
    });
  }

  editRecipe() {
    this.router.navigateByUrl(`/recipe/${this.currentRecipe?.id}/edit`);
  }

  deleteRecipePrompt() {
    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        label: 'Вы уверены?',
        data: {
          content: 'Вы действиетльно хотите удалить текущий рецепт? Рецепт будет полностью удален, данное действие невозможно отменить.',
          yes: 'Да, удалить',
          no: 'Отмена'
        },
      }).subscribe({
        next: (res) => { if (res) this.deleteRecipe() }
      });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.alerts.open('Рецепт успешно удален', { label: 'Успешно', status: 'success' }).subscribe();
        this.router.navigateByUrl('/');
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
}
