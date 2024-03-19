import { palaDB } from "./sqlite";
import { ICategoryItem } from "@/types";


const categoryTableInit = () => {
    try {
        palaDB.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    title VARCHAR(255) NOT NULL, 
                    color VARCHAR(255) NOT NULL, 
                    userId VARCHAR(255) NOT NULL
                )`,
                [],
                () => {
                    console.log("categories table created successfully")
                },
                (_, error): boolean | any => {
                    console.log("categories table error : ", error)
                }
            );
        });
    } catch (error) {
        console.log("category table init : ", { error });
    }
};

// const categoryTableDrop = () => {
//     palaDB.transaction((tx) => {
//         tx.executeSql(
//             "DROP TABLE IF EXISTS categories",
//             [],
//             () => console.log("categories table deleted successfully"),
//             (_, error): boolean | any => console.log(error, "categories table error : ")
//         );
//     });
//     //create table(s)
// };

// const categoryTableAlter = () => {
//     palaDB.transaction((tx) => {
//         tx.executeSql(
//             "ALTER TABLE categories ADD userId VARCHAR(255) NOT NULL",
//             [],
//             () => console.log("categories table updated successfully"),
//             (_, error): boolean | any => {
//                 console.log(error, "categories table error : ")
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Alert',
//                     text2: 'Something went wrong  👋'
//                 })
//             }
//         );
//     });
//     //create table(s)
// };

const insertCategory = (value: ICategoryItem, callback: () => void) => {

    try {
        palaDB.transaction((tx) => {
            console.log({ value }, "2");
            tx.executeSql(
                "INSERT INTO `categories` ('title', 'color', 'userId') VALUES (?, ?, ?)",
                [
                    value?.title,
                    value?.color,
                    value?.userId,
                ],
                () => {
                    console.log("successfully created category");
                    callback()
                },
                (_, error): boolean | any => console.log(error)
            );
        });
    } catch (error) {
        console.log("category create error : ", { error });
    }
};

const fetchCategories = (userId: any, callback: any) => {

    palaDB.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM categories WHERE userId = ?;",
            [`${userId}`],
            (_, { rows: { _array } }) => {
                callback(_array)
                // console.log({ _array });
            },
            (_, error): boolean | any => console.log(error)
        );
    });
};

const updateCategory = (id: string, values: ICategoryItem) => {
    palaDB.transaction((tx) => {
        tx.executeSql("UPDATE categories SET title = ?, color = ? WHERE id = ?",
            [
                values?.title,
                values?.color,
                id,
            ],
            (_, { rows: { _array } }) => console.log("güncelleme başarılı"),
            (_, error): boolean | any => console.log(error)
        );
    });
};

const deleteCategory = (id: string, callback?: any) => {
    palaDB.transaction((tx) => {
        tx.executeSql("DELETE FROM categories WHERE id = ?",
            [id],
            (_, { rows: { _array } }) => callback(_array),
            (_, error): boolean | any => console.log(error)
        );
    });
};

export {
    categoryTableInit,
    // categoryTableDrop,
    fetchCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    // categoryTableAlter,
};