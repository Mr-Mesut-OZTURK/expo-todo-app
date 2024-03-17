
export interface ITodoItem {
    id?: string;
    tagId?: string;
    title: string;
    description: string;
    date: string;
    isDone?: "done" | "inprogress"
}

export interface IKeyvalueItem {
    key: string;
    value: string;
}

export interface IUserItem {
    name: string;
    password: string;
}