import { put, call, takeLatest } from "@redux-saga/core/effects";
import { createComment, deleteComment } from "./slice";
import commentService from "../../services/CommentService";

function* handleCreateComment(action){
    try {
        const newComment = yield call(commentService.createComment, action.payload, action.payload.galleryId);
        yield put(createComment(newComment));
    } catch (error) {
        alert(error.message);
    }
}

function* handleDeleteComment(action){
    try {
        yield call(commentService.deleteComment, action.payload)
        yield put(deleteComment(action.payload));
    } catch (error) {
        alert(error.message);
    }
}

export function* watchCreateComment(){
    yield takeLatest(createComment.type, handleCreateComment);
}

export function* watchDeleteComment(){
    yield takeLatest(deleteComment.type, handleDeleteComment);
}