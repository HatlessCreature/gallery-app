import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/slice";
import galleriesReducer from "./galleries/slice";
import commentsReducer from "./comments/slice";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        galleries: galleriesReducer,
        comments: commentsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware) 
});

for (const saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}

export default store;