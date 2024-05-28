import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../domain/recipe.entity';
import { RecipeCardType } from '../../../domain/recipe-card-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-recipe-index-page',
  templateUrl: './recipe-index-page.component.html',
  styleUrl: './recipe-index-page.component.less'
})
export class RecipeIndexPageComponent implements OnInit {

  items: Recipe[] = [
    {id: '1', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Жаркое по-деревенски', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/1.jpg'},
    {id: '2', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Каша овсяная', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/2.jpg'},
    {id: '3', w: 2, h: 1, type: RecipeCardType.TEXT, title: 'Салат цезарь', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/3.webp'},
    {id: '4', w: 2, h: 2, type: RecipeCardType.VIDEO, content: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&autohide=1&showinfo=0&controls=0'},
    {id: '5', w: 1, h: 2, type: RecipeCardType.TEXT, title: 'Чили кон карне', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/4.jpg'},
    {id: '6', w: 3, h: 1, type: RecipeCardType.TEXT, title: 'Торт "Прага"', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/5.jpg'},
    {id: '7', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Японские гёдза', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/6.webp'},
    {id: '8', w: 3, h: 3, type: RecipeCardType.VIDEO, content: 'https://www.youtube.com/embed/RMCO20yQPLU?modestbranding=1&autohide=1&showinfo=0&controls=0'},
    {id: '9', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Греческий салат', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/7.jpg'},
    {id: '10', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Скрэмбл с лососем и авокадо', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/8.jpg'},
    {id: '11', w: 2, h: 2, type: RecipeCardType.TEXT, title: 'Шакшука', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/9.jpg'},
    {id: '12', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Паста с креветками', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/10.jpg'},
    {id: '13', w: 2, h: 1, type: RecipeCardType.TEXT, title: 'Карпаччо', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/11.jpg'},
    {id: '14', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Сибас на углях', content: 'https://storage.yandexcloud.net/recipe-picture-bucket/12.jpg'},
  ];
  order = new Map();

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    const recipes = this.recipeService.getRecipeList();

    recipes.forEach((element) => {
      const item: Recipe = {
        type: RecipeCardType.TEXT,
        h: 1,
        w: 1,
        title: element.name,
        id: '15',
        content: element.picture,
      };

      this.items.push(item);
    });

    this.items.forEach((item) => {
      if (typeof item.content === 'string') {
        item.content = this.sanitizer.bypassSecurityTrustResourceUrl(item.content);
      }
    });
  }

  public recipeUrl(recipe: Recipe) {
    return `/recipe/${recipe.id}`;
  }

  public openRecipe(recipe: Recipe) {
    this.router.navigateByUrl(`/recipe/${recipe.id}`);
  }

}
