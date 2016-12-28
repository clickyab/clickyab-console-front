import {store} from './store';

export const getToken = () => store.getState().user.token;
export const getEmail = () => store.getState().user.email;
export const getFullName = () => store.getState().user.personal.first_name + store.getState().user.personal.last_name;
export const getCorporationTitle = () => store.getState().user.corporation.title;
export const isLogin = () => store.getState().login;