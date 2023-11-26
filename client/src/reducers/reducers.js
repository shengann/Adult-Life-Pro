import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showSidebar: true,
    showExpenseDetailPopup: false
};

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setSidebar(state, action) {
            state.showSidebar = action.payload
        },
        setExpensesDetailPopup(state) {
            state.showExpenseDetailPopup = !state.showExpenseDetailPopup
        }
    }
})

export const { setExpensesDetailPopup } = rootSlice.actions


export default rootSlice.reducer
