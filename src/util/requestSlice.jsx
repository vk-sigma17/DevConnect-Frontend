import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest:(state, action) => {
            return action.payload;
        },
        removeRequest:(state, action) => {
            const newArray = state.filter((req) => req._id !== action.payload);
            console.log("ascd", newArray)
            return newArray;
        }
    }
})


export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;