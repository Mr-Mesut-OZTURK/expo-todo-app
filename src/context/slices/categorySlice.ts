import { ICategoryItem } from "@/types"
import { createSlice } from "@reduxjs/toolkit"


interface ICategorySlice {
    categories: Array<ICategoryItem>
}


const initialState: ICategorySlice = {
    categories: []
}



export const categorySlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        addCategory: (state, action) => {

        },
        updateCategory: (state, action) => {

        },
        removeCategory: (state, action) => {

        },
    }
})


export const {
    addCategory,
    setCategories,
    removeCategory,
    updateCategory,
} = categorySlice.actions