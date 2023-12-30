export type TCategoriesTypes = 'income' | 'expanse' ;

export interface ICategory {
  id: string;
  type: TCategoriesTypes;
  name: string;
}
export type TCategoryMutation = Omit<ICategory, 'id'>;

export interface ICategoriesList {
  [id: string]: ICategoryApi;
}