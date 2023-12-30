export type TCategoriesTypes = 'income' | 'expanse' ;

export interface ICategory {
  id: string;
  type: TCategoriesTypes;
  name: string;
}
export type TCategoryApi = Omit<ICategory, 'id'>;

export interface ICategoriesList {
  [id: string]: ICategoryApi;
}