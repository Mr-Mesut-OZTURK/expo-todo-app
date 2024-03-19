import { palaDB } from "./sqlite";
import { ITodoItem } from "@/types";
import Toast from "react-native-toast-message";


const todoTableInit = () => {
    try {
        palaDB.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    title VARCHAR(255) NOT NULL, 
                    description VARCHAR(255) NOT NULL, 
                    date VARCHAR(255) NOT NULL, 
                    isDone INTEGER NOT NULL,
                    userId VARCHAR(255) NOT NULL,
                    categoryId VARCHAR(255) NOT NULL
                )`,
                undefined,
                () => console.log("todos table created successfully"),
                (_, error): boolean | any => {
                    console.log("todos init error : ", { error });
                }
            );
        });
    } catch (error) {
        console.log("todos table init : ", { error });
    }
};

const todoTableAlter = () => {
    palaDB.transaction((tx) => {
        tx.executeSql(
            `ALTER TABLE todos ADD categoryId VARCHAR(255) NOT NULL`,
            [],
            () => console.log("categories table updated successfully"),
            (_, error): boolean | any => {
                console.log(error, "categories table error : ", { error })
                Toast.show({
                    type: 'error',
                    text1: 'Alert',
                    text2: 'Something went wrong  👋'
                })
            }
        );
    });
};

const insertTodo = (value: ITodoItem, callback: () => void) => {
    console.log({ value });
    palaDB.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO `todos` ('title', 'description', 'date' ,'isDone', 'userId', 'categoryId') VALUES (?, ?, ?, ?, ?, ?)",
            [
                value?.title,
                value?.description,
                value?.date,
                "inprogress",
                value?.userId ?? "",
                value?.categoryId ?? ""
            ],
            () => {
                console.log("successfully created Todo");
                callback()
            },
            (_, error): boolean | any => console.log(error)
        );
    });
};

const fetchTodos = (userId: string, callback: any) => {
    try {
        palaDB.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM todos WHERE userId = ?",
                [`${userId}`],
                (_, { rows: { _array } }) => {
                    callback(_array)
                    // console.log({ _array });
                },
                (_, error): boolean | any => {
                    console.log("fetch todos error : ", { error });
                }
            );
        });
    } catch (error) {
        console.log("fetch todos error : ", { error });
    }
};

const updateTodoCompletion = (id: string, completed: any) => {
    palaDB.transaction((tx) => {
        tx.executeSql("UPDATE todos SET isDone = ? WHERE id = ?",
            [
                completed,
                id,
            ],
            (_, { rows: { _array } }) => console.log("güncelleme başarılı"),
            (_, error): boolean | any => {
                console.log("update todo error : ", { error });
            }
        );
    });
};

const deleteTodo = (id: string) => {
    palaDB.transaction((tx) => {
        tx.executeSql("DELETE FROM todos WHERE id = ?", [id]);
    });
};

export { todoTableAlter, todoTableInit, insertTodo, fetchTodos, updateTodoCompletion, deleteTodo };