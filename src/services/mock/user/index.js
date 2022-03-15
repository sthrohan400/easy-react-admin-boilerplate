import appConfig from "config/app";

export const users = async (filterObject) => {
    const response = await fetch(`${appConfig.apiUrl}/users`);
    const json = await response.json();
    return json;
};
