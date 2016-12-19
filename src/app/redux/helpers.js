import {store} from './store';

export const getToken = () => store.getState().user.token;
export const isLogin = () => store.getState().login;