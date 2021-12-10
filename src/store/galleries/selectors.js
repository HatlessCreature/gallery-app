export function selectGalleries(state){
    return state.galleries.page;
}

export function selectGallery(state){
    return state.galleries.gallery;
}

export function selectSearchTerm(state){
    return state.galleries.term;
}