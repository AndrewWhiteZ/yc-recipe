import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { RecipeInfo } from '../domain/recipe.info';
import { CreateRecipeRequest } from '../domain/create-recipe.request';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient,
    private alerts: TuiAlertService,
  ) {}

  public createRecipe(createRecipeRequest: CreateRecipeRequest) {
    const formData = new FormData();

    formData.append('name', createRecipeRequest.name);
    formData.append('picture', createRecipeRequest.picture);
    formData.append('text', createRecipeRequest.text);

    this.http.post<RecipeInfo>('localhost:8080/api/v1/recipe/create', formData).subscribe({
      next: (res) => {
        this.alerts.open('Рецепт успешно создан', { label: 'Успешно', status: 'success' }).subscribe();
        return res;
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    })
  }

  public getRecipeInfo(recipeId: string): RecipeInfo | null {
    let info: RecipeInfo | null = null;
    this.http.get<RecipeInfo>(`localhost:8080/api/v1/recipe/view/${recipeId}`).subscribe({
      next: (res) => { info = res; return res },
      error: (err) => { this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe() }
    });
    return info;
  }

  public getRecipeList() {
    let info: RecipeInfo[] = [];
    this.http.get<RecipeInfo[]>(`localhost:8080/api/v1/recipe/list`).subscribe({
      next: (res) => { info = res; return res; },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
    return info;
  }

  public editRecipe(recipeId: string, editRecipeRequest: CreateRecipeRequest) {
    const formData = new FormData();

    formData.append('name', editRecipeRequest.name);
    formData.append('picture', editRecipeRequest.picture);
    formData.append('text', editRecipeRequest.text);

    this.http.post<RecipeInfo>(`localhost:8080/api/v1/recipe/edit/${recipeId}`, formData).subscribe({
      next: (res) => {
        this.alerts.open('Рецепт успешно изменен', { label: 'Успешно', status: 'success' }).subscribe();
        return res;
      },
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }

  public deleteRecipe(recipeId: string) {
    this.http.delete(`localhost:8080/api/v1/recipe/delete/${recipeId}`).subscribe({
      next: () => this.alerts.open('Рецепт успешно удален', { label: 'Успешно', status: 'success' }).subscribe(),
      error: (err) => this.alerts.open(err.statusText, { label: 'Ошибка', status: 'error' }).subscribe()
    });
  }
}
