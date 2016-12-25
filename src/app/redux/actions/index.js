import * as login from './login';
import * as user from './user';
import * as token from './token';
import * as register from './register';

export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const REMOVE_LOCAL_STORAGE = 'REMOVE_LOCAL_STORAGE';
export const USER_LIST = 'USER_LIST';
export const userListAction = (data) => ({type: USER_LIST, data});
export const updateLocalStorageAction = () => ({type: UPDATE_LOCAL_STORAGE});
export const asyncRemoveLocalStorageAction = () => ({type: REMOVE_LOCAL_STORAGE});
export const loginActions = login;
export const userActions = user;
export const tokenActions = token;
export const registerActions = register;