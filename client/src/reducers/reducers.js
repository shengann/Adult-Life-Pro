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
        }
    }
})



export default rootSlice.reducer
