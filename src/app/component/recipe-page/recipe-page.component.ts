import { Component, Inject, OnInit } from '@angular/core';
import { Recipe } from '../../../domain/recipe.entity';
import { RecipeInfo } from '../../../domain/recipe.info';
import { RecipeService } from '../../../service/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.less'
})
export class RecipePageComponent implements OnInit {

  recipeId: string = '';
  currentRecipe: RecipeInfo | null = null;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly route: ActivatedRoute, 
    private readonly recipeService: RecipeService,
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
    });

    this.currentRecipe = this.recipeService.getRecipeInfo(this.recipeId);
  }

  editRecipe() {

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
    this.recipeService.deleteRecipe(this.recipeId);
  }
}
