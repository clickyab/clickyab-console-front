import {store} from './store';

export const getToken = () => store.getState().user.token;
export const getEmail = () => store.getState().user.email;
export const getName = () => store.getState().user.first_name;
export const getFamily = () => store.getState().user.last_name;
export const isLogin = () => store.getState().login;