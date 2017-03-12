import {select} from "../functions/select";

export const getToken = () => select('user.token', 'no token');
export const getEmail = () => select('user.email', '');
export const getFullName = () => select('user.personal.first_name', '') + ' ' + select('user.personal.last_name', '');
export const getCorporationTitle = () => select('user.corporation.title', '');
export const isLogin = () => select('login', false);

export const getCity = () => {
    const user = select('user', {});
    if (user.personal) {
        return user.personal.city_id;
    } else if (user.corporation) {
        return user.corporation.city_id;
    }

    return 0;
};

export const getProvince = () => {
    const user = select('user', {});
    if (user.personal) {
        return user.personal.province_id;
    } else if (user.corporation) {
        return user.corporation.province_id;
    }

    return 0;
};

export const getCountry = () => {
    const user = select('user', {});
    if (user.personal) {
        return user.personal.country_id;
    } else if (user.corporation) {
        return user.corporation.country_id;
    }

    return 0;
};

export const shouldUpdateDefinition = (selector) => {
    return true;
    // return typeof select(selector).definitions == "undefined";
};