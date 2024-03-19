
export interface ITodoItem {
    id?: string;
    categoryId?: string;
    userId?: string;
    title: string;
    description: string;
    date: string;
    isDone?: "done" | "inprogress"
}

export interface IKeyvalueItem {
    id?: any;
    key: string;
    value: string;
}

export interface IUserItem {
    id?: any;
    name: string;
    password: string;
}

export interface ICategoryItem {
    id?: any;
    title: string;
    color: string;
    userId: string;
}