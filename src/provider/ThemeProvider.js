import React, { useEffect } from "react";

export const ThemeContext = React.createContext();

/** TODO:: Add default theme based on configuration */
const initialTheme = { theme: localStorage.getItem("theme") || "light" };

const themeReducer = (state, action) => {
    switch (action.type) {
        case "light":
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            return { theme: "light" };
        case "dark":
            localStorage.setItem("theme", "dark");
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            return { theme: "dark" };
        default:
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            return { theme: "light" };
    }
};

export function ThemeSettingProvider(props) {
    const [state, dispatch] = React.useReducer(themeReducer, initialTheme);
    return (
        <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
