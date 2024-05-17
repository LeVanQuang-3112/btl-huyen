export interface IIncome {
  id?: string;
  date: Date;
  note: string;
  money: number;
  category: ICategory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOutcome {
  id?: string;
  date: Date;
  note: string;
  money: number;
  category: ICategory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  id?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFixedIncome {
  id?: string;
  title: string;
  money: number;
  category: ICategory;
  interval: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFixedOutcome {
  id?: string;
  title: string;
  money: number;
  category: ICategory;
  interval: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
