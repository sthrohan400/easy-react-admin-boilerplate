import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = React.createContext();

/** TODO:: Add default theme based on configuration */

const languageReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            state.changeLang(action.payload);
            return state;
        default:
            return state;
    }
};

export function LanguageSettingProvider(props) {
    const { i18n } = useTranslation();
    /**
     * !NOTES:
     * i18nextLng is the default cookie used
     * by i18n package.
     */
    const defaultLang = localStorage.getItem("i18nextLng") ?? "en";
    const changeLang = (value) => {
        i18n.changeLanguage(value);
    };

    const initialLanguage = {
        defaultLang,
        changeLang
    };

    const [state, dispatch] = React.useReducer(languageReducer, initialLanguage);

    return (
        <LanguageContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </LanguageContext.Provider>
    );
}
