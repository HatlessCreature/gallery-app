import { put, call, takeLatest } from "@redux-saga/core/effects";
import { login, logout, register, getActiveUser, setActiveUser, setToken } from "./slice";
import authService from "../../services/AuthService";

function* handleRegister(action){
    try{
        const {user, token} = yield call(authService.register, action.payload);
        yield put(setToken(token));
        yield put(setActiveUser(user));
    } catch (error){
        alert(error.message);
    }
}

function* handleLogin(action){
    try {
        const {user, token} = yield call(authService.login, action.payload);
        yield put(setToken(token));
        yield put(setActiveUser(user));
    } catch (error) {
        alert(error.message);
    }
}

function* handleLogout(){
    try {
        yield call(authService.logout);
        yield put(setToken(null));
        yield put(setActiveUser(null));
    } catch (error) {
        alert(error.message);
    }
}

function* handleGetActiveUser(){
    try {
        const activeUser = yield call(authService.getActiveUser);
        yield put(setActiveUser(activeUser));
    } catch (error) {
        alert(error.message);
    }
}

export function* watchLogin(){
    yield takeLatest(login.type, handleLogin);
}

export function* watchLogout(){
    yield takeLatest(logout.type, handleLogout);
}

export function* watchRegister(){
    yield takeLatest(register.type, handleRegister);
}

export function* watchGetActiveUser(){
    yield takeLatest(getActiveUser.type, handleGetActiveUser);
}