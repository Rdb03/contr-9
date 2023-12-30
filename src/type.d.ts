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

export interface ITransaction {
  id: string;
  category: {
    name: string;
    type: string;
  };
  amount: number;
  createAt: string;
}

export interface ITransactionMutation {
  category: string;
  amount: string;
  createAt: string;
}

export interface  TTransactionApi {
  category: string;
  amount: number;
  createdAt: string;
}

export interface ITransactionList {
  [id: string]: ITransactionApi;
}

