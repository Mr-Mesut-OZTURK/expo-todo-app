import { IKeyvalueItem } from "@/types";
import { palaDB } from "./sqlite";


const keyvalueTableInit = () => {
    palaDB.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS keyvalue (id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL)",
            [],
            () => console.log("keyvalue created successfully"),
            (_, error): boolean | any => console.log(error)
        );
    });
    //create table(s)
};

const insertKeyvalue = (value: IKeyvalueItem, callback: () => void) => {
    palaDB.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO `keyvalue` ('key', 'value') VALUES (?, ?)",
            [
                value?.key,
                value?.value,
            ],
            () => {
                console.log("successfully created task");
                callback()
            },
            (_, error): boolean | any => console.log(error)
        );
    });
};

const fetchKeyValues = (callback: any) => {
    return new Promise((resolve, reject) => {

        palaDB.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM keyvalue;",
                undefined,
                (_, { rows: { _array } }) => {
                    callback(_array)
                    return resolve(_array)
                },
                (_, error): boolean | any => reject(error)
            );
        });

    })
};

const updateKeyValue = (id: string, completed: any) => {
    palaDB.transaction((tx) => {
        tx.executeSql("UPDATE keyvalue SET isDone = ? WHERE id = ?",
            [
                completed,
                id,
            ],
            (_, { rows: { _array } }) => console.log("güncelleme başarılı"),
            (_, error): boolean | any => console.log(error)
        );
    });
};

const deleteKeyvalue = (id: string) => {
    palaDB.transaction((tx) => {
        tx.executeSql("DELETE FROM keyvalue WHERE key = ?", [id]);
    });
};

export { keyvalueTableInit, insertKeyvalue, fetchKeyValues, updateKeyValue, deleteKeyvalue };