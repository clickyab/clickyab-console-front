import {select} from "../functions/select";

export const getToken = () => select('user.token', 'no token');
export const getEmail = () => select('user.email', '');
export const getFullName = () => select('user.personal.first_name', '') + select('user.personal.last_name', '');
export const getCorporationTitle = () => select('user.corporation.title', '');
export const isLogin = () => select('login', false);