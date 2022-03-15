import React, { useEffect } from "react";
import { ThemeContext } from "provider/ThemeProvider";
import { Radio } from "antd";
import PropTypes from "prop-types";

const availableThemes = [
    {
        label: "Light",
        value: "light"
    },
    {
        label: "Dark",
        value: "dark"
    }
];

const ThemeSelect = (props) => {
    const theme = React.useContext(ThemeContext);
    const themeValue = theme.state.theme;

    const changeTheme = (value) => {
        theme.dispatch({ type: value });
    };
    useEffect(() => {
        changeTheme(themeValue);
    }, []);

    return (
        <Radio.Group
            {...props}
            onChange={(e) => changeTheme(e.target.value)}
            value={themeValue}
            optionType="button"
        />
    );
};

ThemeSelect.propTypes = {
    style: PropTypes.object
};

export default ThemeSelect;
