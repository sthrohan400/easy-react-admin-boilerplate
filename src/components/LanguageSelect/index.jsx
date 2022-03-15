import React from "react";
import { Select } from "antd";
import { LanguageContext } from "provider/LanguageProvider";

/**
 * TODO maket it better
 * @param {} param0
 * @returns
 */
function LanguageSelect({ ...config }) {
    const languageContext = React.useContext(LanguageContext);

    const changeLanguage = (value) => {
        languageContext.dispatch({ type: "CHANGE_LANGUAGE", payload: value });
    };

    let { options, ...configuration } = { ...config };

    return (
        <Select
            {...configuration}
            defaultValue={languageContext.state.defaultLang}
            options={options}
            onChange={changeLanguage}
        />
    );
}

export default LanguageSelect;
