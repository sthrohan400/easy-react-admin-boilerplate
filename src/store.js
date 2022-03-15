import { configureStore } from "@reduxjs/toolkit";
import appReducer from "slices/app";

const reducer = {
    app: appReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;
