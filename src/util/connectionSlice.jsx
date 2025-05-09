import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: (state, action) => {
            return null;
        }
    }
});

// Named export for actions
export const { addConnection, removeConnection } = connectionSlice.actions;

// Default export of the reducer
export default connectionSlice.reducer;  // Ensure it's a default export

