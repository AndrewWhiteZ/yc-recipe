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
    {id: '1', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Жаркое по-деревенски', content: 'https://static.1000.menu/img/content-v2/c9/db/27071/jarkoe-iz-svininy-s-kartofelem-po-domashnemu_1614783158_14_max.jpg'},
    {id: '2', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Каша овсяная', content: 'https://s1.eda.ru/StaticContent/Photos/130822102925/190811172037/p_O.jpg'},
    {id: '3', w: 2, h: 1, type: RecipeCardType.TEXT, title: 'Салат цезарь', content: 'https://images.gastronom.ru/ApmxtW3a7fVw3qVqvZfvEBmaXaYCeBbYheJU4ERdsAc/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzVhNzFhZGY1LTM3MTYtNDlmMy04NDNlLTAwMTg4MGNiM2E0OS5qcGc'},
    {id: '4', w: 2, h: 2, type: RecipeCardType.VIDEO, content: 'https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&autohide=1&showinfo=0&controls=0'},
    {id: '5', w: 1, h: 2, type: RecipeCardType.TEXT, title: 'Чили кон карне', content: 'https://foodmood.ru/upload/iblock/c44/c441fbc628b24d541d529a81c7a30380.jpg'},
    {id: '6', w: 3, h: 1, type: RecipeCardType.TEXT, title: 'Торт "Прага"', content: 'https://pirogvatrushka.ru/files/images/product-photo/desktop/1p/ra/1praganwss1.jpg'},
    {id: '7', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Японские гёдза', content: 'https://zumavl.ru/upload/webp/resize_cache/005/800_500_2/005c3f41875335a884156bc35463c68d.webp'},
    {id: '8', w: 3, h: 3, type: RecipeCardType.VIDEO, content: 'https://www.youtube.com/embed/RMCO20yQPLU?modestbranding=1&autohide=1&showinfo=0&controls=0'},
    {id: '9', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Греческий салат', content: 'https://img.delo-vcusa.ru/2014/02/grecheskij-salat.jpg'},
    {id: '10', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Скрэмбл с лососем и авокадо', content: 'https://bunchofspinach.com/wp-content/uploads/scrambled-eggs.jpg'},
    {id: '11', w: 2, h: 2, type: RecipeCardType.TEXT, title: 'Шакшука', content: 'https://s1.eda.ru/StaticContent/Photos/120131082509/150830163929/p_O.jpg'},
    {id: '12', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Паста с креветками', content: 'https://cdn.lifehacker.ru/wp-content/uploads/2022/07/111_1657788413-scaled-e1657788479118-1280x640.jpg'},
    {id: '13', w: 2, h: 1, type: RecipeCardType.TEXT, title: 'Карпаччо', content: 'https://asador.ru/upload/iblock/25c/25c76e68fd3e7eebf0c99933dc37a913.jpg'},
    {id: '14', w: 1, h: 1, type: RecipeCardType.TEXT, title: 'Сибас на углях', content: 'https://kafe-biblioteka.ru/wa-data/public/shop/products/41/00/41/images/40/40.750x0.jpg'},
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
