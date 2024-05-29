import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { RecipeInfo } from '../domain/recipe.info';
import { CreateRecipeRequest } from '../domain/create-recipe.request';
import { BaseResponse } from '../domain/base.response';
import { Observable } from 'rxjs';

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

    const recipeInfo: Object = {
      'name': createRecipeRequest.name,
      'text': createRecipeRequest.text,
    }

    const recipeInfoBlob = new Blob([JSON.stringify(recipeInfo)], {
      type: 'application/json'
    })

    formData.append('recipeInfo', recipeInfoBlob);
    formData.append('image', createRecipeRequest.picture, 'file.png');

    return this.http.post<BaseResponse<RecipeInfo>>('/api/v1/recipe/create', formData);
  }

  public getRecipeInfo(recipeId: string): Observable<BaseResponse<RecipeInfo>> {
    return this.http.get<BaseResponse<RecipeInfo>>(`/api/v1/recipe/view/${recipeId}`);
  }

  public getRecipeList(): Observable<BaseResponse<RecipeInfo[]>> {
    return this.http.get<BaseResponse<RecipeInfo[]>>(`/api/v1/recipe/list`);
  }

  public editRecipe(recipeId: string, editRecipeRequest: CreateRecipeRequest) {
    const formData = new FormData();

    const recipeInfo: Object = {
      'name': editRecipeRequest.name,
      'text': editRecipeRequest.text,
    }

    const recipeInfoBlob = new Blob([JSON.stringify(recipeInfo)], {
      type: 'application/json'
    })

    formData.append('recipeInfo', recipeInfoBlob);
    formData.append('image', editRecipeRequest.picture, 'file.png');

    return this.http.post<BaseResponse<RecipeInfo>>(`/api/v1/recipe/edit/${recipeId}`, formData);
  }

  public deleteRecipe(recipeId: string): Observable<BaseResponse<null>> {
    return this.http.delete<BaseResponse<null>>(`/api/v1/recipe/delete/${recipeId}`);
  }
}
