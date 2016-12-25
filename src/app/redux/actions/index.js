import * as login from './login';
import * as user from './user';
import * as token from './token';
import * as register from './register';

export const UPDATE_LOCAL_STORAGE = 'UPDATE_LOCAL_STORAGE';
export const REMOVE_LOCAL_STORAGE = 'REMOVE_LOCAL_STORAGE';
export const USER_LIST = 'USER_LIST';
export const CHANNEL_LIST = 'CHANNEL_LIST';
export const CAMPAIGN_LIST = 'CAMPAIGN_LIST';
export const campaignListAction = (data) => ({type: CAMPAIGN_LIST, data});
export const userListAction = (data) => ({type: USER_LIST, data});
export const channelListAction = (data) => ({type: CHANNEL_LIST, data});
export const updateLocalStorageAction = () => ({type: UPDATE_LOCAL_STORAGE});
export const asyncRemoveLocalStorageAction = () => ({type: REMOVE_LOCAL_STORAGE});
export const loginActions = login;
export const userActions = user;
export const tokenActions = token;
export const registerActions = register;