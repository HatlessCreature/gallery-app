import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries() {},
    getGallery() {},
    createGallery() {},
    editGallery() {},
    deleteGallery() {},
    createComment() {},
    deleteComment() {}
};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
        },
        gallery: null ,
        term: null,
        userId: null

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
        setSearchUserId(state, action){
            state.userId = action.payload;
        },
        setPaginatedGalleries(state, action){
            state.page.data = [...state.page.data, ...action.payload.data];
            state.page.current_page = action.payload.current_page;
        },
        setGalleryWithNewComment(state, action){
            state.gallery = {...state.gallery, comments: [...state.gallery.comments, action.payload]};
        },
        setGalleryWithoutComment(state, action){
            state.gallery = {...state.gallery, comments: state.gallery.comments.filter((id) => id !== action.payload)};
        },
        ...middlewareActions
    }
});

export const { getGalleries, getGallery, setGalleries, setGallery, createGallery, 
    editGallery, deleteGallery, setSearchTerm, setSearchUserId, setPaginatedGalleries,
    createComment, deleteComment, setGalleryWithNewComment, setGalleryWithoutComment } = galleriesSlice.actions;
export default galleriesSlice.reducer;