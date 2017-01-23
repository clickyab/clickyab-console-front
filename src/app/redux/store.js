import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {localeReducer, cssLazyLoader} from 'react-multilingual';
import {loginReducer, userReducer, impersonateReducer} from './reducers';
import createLogger from 'redux-logger';
import {asyncPullIntoLocalStorage} from '../middlewares/asyncPullIntoLocalStorage';
import localStorage from 'store';
import {asyncRemoveLocalStorage} from "../middlewares/asyncRemoveLocalStorage";
import {userListReducer} from "./reducers/userList";
import {channelListReducer} from "./reducers/channelList";
import {campaignListReducer} from "./reducers/campaignList";
import {categoryListReducer} from "./reducers/categoryList";
import {channelDataReducer} from "./reducers/channelDataReducer";
import {userDataReducer} from "./reducers/userDataReducer";
import {categoryDataReducer} from "./reducers/CategoryDataReducer";
import {planListReducer} from "./reducers/planList";
import {createCampaignReducer} from './reducers/createCampaignDataReducer';
import queryReducer from "./reducers/queryReducer";
import userTypeReducer from "./reducers/userTypeReducer";
import {telegramListReducer} from "./reducers/telegramListReducer";
import {campaignStepReducer} from "./reducers/campaignStepReducer";

const enhancer = compose;
const logger = createLogger();

export const store = createStore(
    combineReducers({
        login: loginReducer,

        impersonate: impersonateReducer,
        user: userReducer,
        userList: userListReducer,
        userData: userDataReducer,
        userType: userTypeReducer,

        channelList: channelListReducer,
        channelData: channelDataReducer,

        campaignList: campaignListReducer,
        createCampaignData: createCampaignReducer,
        campaignStepData: campaignStepReducer,

        categoryList: categoryListReducer,
        categoryData: categoryDataReducer,

        telegramList: telegramListReducer,

        planList : planListReducer,

        queries: queryReducer,

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
        asyncPullIntoLocalStorage,
        asyncRemoveLocalStorage,
        logger
        )
    )
);