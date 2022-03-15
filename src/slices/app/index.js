import { createSlice } from "@reduxjs/toolkit";
import { appInfo } from "services/app";

const initialState = {
    app: {
        appName: null,
        appLogo: null,
        activeLang: null,
        activeTheme: null,
        languages: [],
        themes: [],
        region: null,
        updatedAt: null
    }
};

export const appSlice = createSlice({
    name: "app-slice",
    initialState,
    reducers: {
        initApp: (state) => {
            const result = appInfo();
            // console.log({ ...state.app, ...result });
            return { ...state.app, ...result };
        }
    },
    extraReducers: {
        /**
         * TODO: ADD your async reducers here
         */
    }
});

const { reducer, actions } = appSlice;
export const { initApp } = actions;
export default reducer;
