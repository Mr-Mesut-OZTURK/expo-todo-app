import { ITodoItem } from "@/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

const todoTableInit = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, isDone INTEGER NOT NULL)",
            [],
            () => console.log("todos created successfully"),
            (_, error): boolean | any => console.log(error)
        );
    });
    //create table(s)
};

const insertTask = (value: ITodoItem, callback: () => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO `todos` ('title', 'description', 'date' ,'isDone') VALUES (?, ?, ?,?)",
            [
                value?.title,
                value?.description,
                value?.date,
                "inprogress"
            ],
            () => {
                console.log("successfully created task");
                callback()
            },
            (_, error): boolean | any => console.log(error)
        );
    });
};

const fetchTasks = (callback: any) => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM todos;",
            undefined,
            (_, { rows: { _array } }) => callback(_array),
            (_, error): boolean | any => console.log(error)
        );
    });
};

const updateTaskCompletion = (id: SQLite.SQLStatementArg, completed: any) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE todos SET isDone = ? WHERE id = ?",
            [
                completed,
                id,
            ],
            (_, { rows: { _array } }) => console.log("güncelleme başarılı"),
            (_, error): boolean | any => console.log(error)
        );
    });
};

const deleteTask = (id: SQLite.SQLStatementArg) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM todos WHERE id = ?", [id]);
    });
};

export { todoTableInit, insertTask, fetchTasks, updateTaskCompletion, deleteTask };