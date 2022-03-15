import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";

import EN_TRANSLATION from "./translations/en";
import ZH_TRANSLATION from "./translations/zh";

export const translationResources = {
    en: {
        translation: EN_TRANSLATION
    },
    zh: {
        translation: ZH_TRANSLATION
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translationResources,
        // lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // react already safes from xss
            format: function (value, format, lng) {
                if (value instanceof Date) return moment(value).format(format);
                if (typeof value === "number") return new Intl.NumberFormat().format(value);
                return value;
            }
        }
    });

export default i18n;
