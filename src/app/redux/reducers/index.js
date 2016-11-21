import {default as login} from "./loginReducer";
import {default as user} from "./userReducer";
import {default as token} from "./tokenReducer";
import {default as register} from "./registerReducer";
import {default as impersonate} from "./impersonateReducer";


export const loginReducer = login;
export const userReducer = user;
export const tokenReducer = token;
export const registerReducer = register;
export const impersonateReducer = impersonate;