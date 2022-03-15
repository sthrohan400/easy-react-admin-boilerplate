/**
 * !danger : Application configuration
 */
export default {
    appName: "Easy PS",
    appLogo: "",
    apiUrl: "https://jsonplaceholder.typicode.com", //"http://localhost:8000/api/v1.0/",
    languages: [
        { value: "en", label: "EN" },
        { value: "zh", label: "ZH" }
    ],
    themes: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
    ],
    formFilter: {
        allowedOperators: ["=", ">", "<", "contains", "between"]
    }
};
