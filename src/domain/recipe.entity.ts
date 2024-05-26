import { SafeResourceUrl } from "@angular/platform-browser";
import { RecipeCardType } from "./recipe-card-type.enum";

export interface Recipe {
  id: string;
  w: number;
  h: number;
  title?: string;
  type: RecipeCardType;
  content: string | SafeResourceUrl;
}
