import { ITodoItem } from "@/types"
import { createSlice, nanoid } from "@reduxjs/toolkit"


interface ITodoSlice {
    todos: Array<ITodoItem>
}


const initialState: ITodoSlice = {
    todos: []
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {

        },
        updateTodo: (state, action) => {

        },
        removeTodo: (state, action) => {

        },
    }
})


export const {
    setTodos,
} = todoSlice.actions