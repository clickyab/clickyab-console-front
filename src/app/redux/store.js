import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {localeReducer, cssLazyLoader} from 'react-multilingual';
import {loginReducer, userReducer, registerReducer, impersonateReducer} from './reducers';
import {routerReducer} from 'react-router-redux';
import createLogger from 'redux-logger';
import {asyncPullIntoLocalStorage} from "../middlewares/asyncPullIntoLocalStorage";
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router';
import localStorage from 'store';
import {asyncRemoveLocalStorage} from "../middlewares/asyncRemoveLocalStorage";
import {userListReducer} from "./reducers/userList";
import {channelListReducer} from "./reducers/channelList";
import {campaignListReducer} from "./reducers/campaignList";

const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

export const store = createStore(
    combineReducers({
        routing: routerReducer,
        impersonate: impersonateReducer,
        register: registerReducer,
        login: loginReducer,
        user: userReducer,
        userList: userListReducer,
        channelList: channelListReducer,
        campaignList: campaignListReducer,
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
        // logger
        )
    )
);