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
            state.galleries = action.payload;
        },
        setGallery(state, action){
            state.gallery = action.payload;
        },
        ...middlewareActions
    }
});

export const { getGalleries, getGallery, setGalleries, setGallery, createGallery, editGallery, deleteGallery } = galleriesSlice.actions;
export default galleriesSlice.reducer;