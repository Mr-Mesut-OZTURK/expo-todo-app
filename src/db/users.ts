import { IUserItem } from "@/types";
import { palaDB } from "./sqlite";


const userTableInit = () => {
    try {
        palaDB.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name VARCHAR(255) NOT NULL, 
                    password VARCHAR(255) NOT NULL
                )`,
                [],
                () => {
                    console.log("users table created successfully")
                },
                (_, error): boolean | any => {
                    console.log("user table init : ", { error });
                }
            );
        });
    } catch (error) {
        console.log("user table init : ", { error });
    }
};

const insertUser = (value: IUserItem, callback: () => void) => {
    try {
        palaDB.transaction((tx) => {
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
    } catch (error) {
        console.log({ error });
    }
};

const fetchUser = (value: IUserItem, callback: any) => {

    return new Promise((resolve, reject) => {
        palaDB.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM users where name = ? and password = ?",
                [
                    value.name,
                    value.password
                ],
                (_, { rows: { _array } }) => {
                    // console.log({ _array });
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
//     palaDB.transaction((tx) => {
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
//     palaDB.transaction((tx) => {
//         tx.executeSql("DELETE FROM users WHERE id = ?", [id]);
//     });
// };

export { userTableInit, insertUser, fetchUser, };