
import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
    name: "feed",
    initialState: [], // Initialize as an empty array
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state,action) => {
            const newFeed=state.filter((user)=>user._id!=action.payload)
            return newFeed;
        }
    },
});
export const { addFeed,removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
