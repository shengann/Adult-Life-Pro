import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showSidebar: true
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
