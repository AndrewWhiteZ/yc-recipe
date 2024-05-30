import { Component, OnInit, SecurityContext } from '@angular/core';
import { Recipe } from '../../../domain/recipe.entity';
import { RecipeCardType } from '../../../domain/recipe-card-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecipeService } from '../../../service/recipe.service';
import { RecipeInfo } from '../../../domain/recipe.info';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-recipe-index-page',
  templateUrl: './recipe-index-page.component.html',
  styleUrl: './recipe-index-page.component.less'
})
export class RecipeIndexPageComponent implements OnInit {

  items: Recipe[] = [];
  order = new Map();

  gridSize: { [ code: number ]: { h: number, w: number } } = {
    0: { h: 2, w: 2 },
    1: { h: 2, w: 1 },
    2: { h: 3, w: 1 },
    3: { h: 2, w: 1 },
    4: { h: 3, w: 2 },
    5: { h: 3, w: 1 },
    6: { h: 2, w: 2 },
    7: { h: 3, w: 2 },
    8: { h: 2, w: 2 },
    9: { h: 3, w: 3 },
    10: { h: 2, w: 1 },
    11: { h: 3, w: 1 },
    12: { h: 2, w: 1 }
  }

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipeList().subscribe({
      next: (res) => {
        this.items.push(...this.mapToRecipe(res.data));
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }

  mapToRecipe(recipeInfos: RecipeInfo[]): Recipe[] {
    const recipes: Recipe[] = [];

    recipeInfos.forEach((recipeInfo: RecipeInfo, index) => {
      const recipe: Recipe = {
        id: recipeInfo.id,
        type: RecipeCardType.TEXT,
        w: this.gridSize[index % 12].w,
        h: this.gridSize[index % 12].h,
        title: recipeInfo.name,
        content: recipeInfo.picture
      };

      recipes.push(recipe);
    });

    return recipes;
  }

  public recipeUrl(recipe: Recipe) {
    return `/recipe/${recipe.id}`;
  }

  public openRecipe(recipe: Recipe) {
    this.router.navigateByUrl(`/recipe/${recipe.id}`);
  }

}
