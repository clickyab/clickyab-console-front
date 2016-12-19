import {store} from './store';

export const getToken = () => store.getState().user.token;
export const getEmail = () => store.getState().user.email;
export const isLogin = () => store.getState().login;