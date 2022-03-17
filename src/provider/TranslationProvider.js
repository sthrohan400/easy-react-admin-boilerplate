import React from "react";
import { useTranslation } from "react-i18next";

export const TranslationContext = React.createContext();

/** TODO:: Add default theme based on configuration */

const translationReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            state.changeLang(action.payload);
            return state;
        default:
            return state;
    }
};

export function TranslationSettingProvider(props) {
    const { t, i18n } = useTranslation();

    const defaultLang = localStorage.getItem("i18nextLng") ?? "en";
    const changeLang = (value) => {
        i18n.changeLanguage(value);
    };

    const initialLanguage = {
        defaultLang,
        changeLang
    };

    const [state, dispatch] = React.useReducer(translationReducer, initialLanguage);

    return (
        <TranslationContext.Provider value={{ t, i18n, state: state, dispatch: dispatch }}>
            {props.children}
        </TranslationContext.Provider>
    );
}
