import { put, call, takeLatest } from "@redux-saga/core/effects";
import { getGalleries, getGallery, setGalleries, setGallery, createGallery, editGallery, deleteGallery } from "./slice";
import galleryService from "../../services/GalleryService";

function* handleGetGalleries(action){
    try{
        console.log(action);
        const galleries = yield call(galleryService.getGalleries, action.payload?.page, action.payload?.term);
        yield put(setGalleries(galleries));
    } catch (error){
        alert(error.message);
    }
}

function* handleGetGallery(action){
    try {
        const gallery = yield call(galleryService.getGallery, action.payload);
        yield put(setGallery(gallery));
    } catch (error) {
        alert(error.message);
    }
}

function* handleCreateGallery(action){
    try {
        const newGallery = yield call(galleryService.createGallery, action.payload.data);
        yield put(createGallery(newGallery));
    } catch (error) {
        alert(error.message);
    }
}

function* handleEditGallery(action){
    try {
        const gallery = yield call(galleryService.editGallery, action.payload.id, action.payload.data);
        yield put(editGallery(gallery));
    } catch (error) {
        alert(error.message);
    }
}

function* handleDeleteGallery(action){
    try {
        yield call(galleryService.deleteGallery, action.payload)
        yield put(deleteGallery(action.payload));
    } catch (error) {
        alert(error.message);
    }
}

export function* watchGetGalleries(){
    yield takeLatest(getGalleries.type, handleGetGalleries);
}

export function* watchGetGallery(){
    yield takeLatest(getGallery.type, handleGetGallery);
}

export function* watchCreateGallery(){
    yield takeLatest(createGallery.type, handleCreateGallery);
}

export function* watchEditGallery(){
    yield takeLatest(editGallery.type, handleEditGallery);
}

export function* watchDeleteGallery(){
    yield takeLatest(deleteGallery.type, handleDeleteGallery);
}