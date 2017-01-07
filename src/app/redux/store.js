import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {localeReducer, cssLazyLoader} from 'react-multilingual';
import {loginReducer, userReducer, registerReducer, impersonateReducer} from './reducers';
import {routerReducer} from 'react-router-redux';
import createLogger from 'redux-logger';
import {asyncPullIntoLocalStorage} from '../middlewares/asyncPullIntoLocalStorage';
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router';
import localStorage from 'store';
import {asyncRemoveLocalStorage} from "../middlewares/asyncRemoveLocalStorage";
import {userListReducer} from "./reducers/userList";
import {channelListReducer} from "./reducers/channelList";
import {campaignListReducer} from "./reducers/campaignList";
import {categoryListReducer} from "./reducers/categoryList";
import {channelDataReducer} from "./reducers/channelDataReducer";
import {userDataReducer} from "./reducers/userDataReducer";
import queryReducer from "./reducers/queryReducer";
import {categoryDataReducer} from "./reducers/CategoryDataReducer";

const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

export const store = createStore(
    combineReducers({
        routing: routerReducer,

        register: registerReducer,
        login: loginReducer,

        impersonate: impersonateReducer,
        user: userReducer,
        userList: userListReducer,
        userData: userDataReducer,

        channelList: channelListReducer,

        channelData: channelDataReducer,

        campaignList: campaignListReducer,

        categoryList: categoryListReducer,

        queries: queryReducer,

        categoryData: categoryDataReducer,
        form: formReducer,

        locale: localeReducer('fa', require('../../locales/index').default)
    }),
    localStorage.get('initialState'),
    enhancer(applyMiddleware(
        cssLazyLoader(['LOCALE_CHANGED'], {
            'en': {
                address: 'css/style-ltr.css',
                direction: 'ltr'
            },
            'fa': {
                address: 'css/style-rtl.css',
                direction: 'rtl'
            }
        }),
        reactRouterReduxMiddleware,
        asyncPullIntoLocalStorage,
        asyncRemoveLocalStorage,
        logger
        )
    )
);