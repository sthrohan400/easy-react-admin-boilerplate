import React from "react";
import { Select } from "antd";
import { TranslationContext } from "provider/TranslationProvider";

/**
 * TODO maket it better
 * @param {} param0
 * @returns
 */
function LanguageSelect({ ...config }) {
    const translationContext = React.useContext(TranslationContext);

    const changeLanguage = (value) => {
        translationContext.dispatch({ type: "CHANGE_LANGUAGE", payload: value });
    };

    let { options, ...configuration } = { ...config };

    return (
        <Select
            {...configuration}
            defaultValue={translationContext.state.defaultLang}
            options={options}
            onChange={changeLanguage}
        />
    );
}

export default LanguageSelect;
