import { ITodoItem } from "@/types";
import { createSlice, nanoid } from "@reduxjs/toolkit";

interface ITodoSlice {
  todos: Array<ITodoItem>;
}

const initialState: ITodoSlice = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {},
    updateTodo: (state, action) => {
      // console.log({ action });
      const selectedTodo = state.todos?.find(
        (todoItem) => todoItem.id == action.payload
      );
      // console.log({ selectedTodo });
      if (selectedTodo) {
        selectedTodo.isDone =
          selectedTodo?.isDone === "done" ? "inprogress" : "done";
      }
    },
    removeTodo: (state, action) => {},
  },
});

export const { setTodos, updateTodo } = todoSlice.actions;
