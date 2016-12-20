import * as login from './login';
import * as user from './user';
import * as token from './token';
import * as register from './register';

export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const REMOVE_LOCAL_STORAGE = 'REMOVE_LOCAL_STORAGE';
export const updateLocalStorage = () => ({type: UPDATE_LOCAL_STORAGE});
export const removeLocalStorage = () => ({type: REMOVE_LOCAL_STORAGE});
export const loginActions = login;
export const userActions = user;
export const tokenActions = token;
export const registerActions = register;