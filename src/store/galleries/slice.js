import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries() {},
    getGallery() {},
    createGallery() {},
    editGallery() {},
    deleteGallery() {}
};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
    },
},
    reducers: {
        setGalleries(state, action){
            state.page = action.payload;
        },
        setGallery(state, action){
            state.gallery = action.payload;
        },
        setSearchTerm(state, action){
            state.term = action.payload;
        },
        ...middlewareActions
    }
});

export const { getGalleries, getGallery, setGalleries, setGallery, createGallery, editGallery, deleteGallery, setSearchTerm } = galleriesSlice.actions;
export default galleriesSlice.reducer;