import { IUserItem } from "@/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

const userTableInit = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)",
            [],
            () => console.log("users created successfully"),
            (_, error): boolean | any => console.log(error)
        );
    });
    //create table(s)
};

const insertUser = (value: IUserItem, callback: () => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO `users` ('name', 'password') VALUES (?, ?)",
            [
                value?.name,
                value?.password,

            ],
            () => {
                console.log("successfully created user");
                callback()
            },
            (_, error): boolean | any => console.log(error)
        );
    });
};

const fetchUser = (value: IUserItem, callback: any) => {

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM users where name = ? and password = ?",
                [
                    value.name,
                    value.password
                ],
                (_, { rows: { _array } }) => {
                    console.log({ _array });
                    callback(_array)
                    resolve(_array)
                },
                (_, error): boolean | any => {
                    console.log(error)
                    reject(error)
                }
            );
        });
    })
};

// const updateTaskCompletion = (id: SQLite.SQLStatementArg, completed: any) => {
//     db.transaction((tx) => {
//         tx.executeSql("UPDATE users SET isDone = ? WHERE id = ?",
//             [
//                 completed,
//                 id,
//             ],
//             (_, { rows: { _array } }) => console.log("güncelleme başarılı"),
//             (_, error): boolean | any => console.log(error)
//         );
//     });
// };

// const deleteTask = (id: SQLite.SQLStatementArg) => {
//     db.transaction((tx) => {
//         tx.executeSql("DELETE FROM users WHERE id = ?", [id]);
//     });
// };

export { userTableInit, insertUser, fetchUser, };