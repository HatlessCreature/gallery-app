import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    createComment() {},
    deleteComment() {}
};

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        content: "",
},
    reducers: {
        ...middlewareActions
    }
});

export const { createComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;