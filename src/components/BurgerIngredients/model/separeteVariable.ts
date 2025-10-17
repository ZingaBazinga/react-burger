import { IIngredient } from "../../../entities/ingredient";

export function separeteVariable(ingredients: IIngredient[]) {
  const bun = ingredients.filter((ingredient) => ingredient.type === "bun");
  const main = ingredients.filter((ingredient) => ingredient.type === "main");
  const sauce = ingredients.filter((ingredient) => ingredient.type === "sauce");
  return { bun, main, sauce };
}
