import { ITodoItem } from "@/types"
import { createSlice, nanoid } from "@reduxjs/toolkit"
import * as SQLite from 'expo-sqlite'
import { Platform } from "react-native"


interface ITodoSlice {
    todoList: Array<ITodoItem>
}


const initialState: ITodoSlice = {
    todoList: [
        // {
        //     id: "sldflsjk",
        //     tagId: "iş",
        //     title: 'Kitap oku.',
        //     description: 'Lorem ipsum dolor sit amet, consectetur',
        //     date: "2024-03-12",
        //     isDone: "inprogress"
        // }
    ]
}

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("expotodoapp.db");
    return db;
}

const db = openDatabase()


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTodos: (state, action) => {
            console.log({ action });
            state.todoList = action.payload
        },
        addTodo: (state, action) => {
            const newTodo: ITodoItem = {
                ...action.payload,
                tagId: "iş",
                id: nanoid(),
                isDone: false
            }
            state.todoList.push(newTodo)
            db.transaction(async tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT, date VARCHAR(255) NOT NULL, isDone INTEGER NOT NULL)",
                    [],
                    (_, result) => {
                        // Table created successfully or already exists
                        console.log(`Table created successfully`, result);
                    },

                )
            })

            db.transaction(tx => {
                tx.executeSql(
                    "INSERT INTO `todos` ('title', 'description', 'date' ,'isDone') VALUES (?, ?, ?,)",
                    [
                        action.payload.title,
                        action.payload.description,
                        action.payload.date,
                        "inprogress"
                    ],
                    (txObj, result) => {
                        console.log({ txObj, result });
                    }
                )
            })
        },
        updateTodo: (state, action) => {

        },
        delTodo: (state, action) => {
            // console.log({ action: action.payload });

            // state.todoList.filter(t => t.id !== action.payload.id)

            const newList = [...state.todoList]
            const filteredList = newList.filter(t => t.id !== action.payload.id)
            // console.log({ newList, filteredList });
            state.todoList = filteredList
        },
        makeDoneTodo: (state, action) => {

        },
    }
})


export const {
    getTodos,
    addTodo,
    updateTodo,
    delTodo,
    makeDoneTodo,
} = todoSlice.actions