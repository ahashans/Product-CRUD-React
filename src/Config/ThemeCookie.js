import * as Cookies from "js-cookie";
export const setThemeCookie = (theme) => {
    Cookies.remove("theme");
    Cookies.set("theme", theme, { expires: 14 });
};
export const getThemeCookie = () => {
    const themeCookie = Cookies.get("theme");
    if (themeCookie === undefined) {
        return {};
    }
    else {
        return JSON.parse(themeCookie);
    }
};
